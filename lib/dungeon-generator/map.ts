'use client'
// modified from https://jsfiddle.net/bigbadwaffle/YeazH/

interface Room {
  x: number
  y: number
  w: number
  h: number
}

type Map = (0 | 1 | 2 | 3)[][]

export class Dungeon {
  current_room: number = 1;
  map: Map = [];
  map_size: 64 = 64;
  rooms: Room[] = [];
  room_count: number;

  constructor({
    currentRoom = 1,
    numberOfRooms = 10,
  } = {}) {
    this.map = [];
    this.rooms = [];
    this.room_count = numberOfRooms;
    this.current_room = currentRoom
  }

  Generate() {
    for (let x = 0; x < this.map_size; x++) {
      this.map[x] = [];
      for (let y = 0; y < this.map_size; y++) {
        this.map[x][y] = 0;
      }
    }

    let min_size = 8;
    let max_size = 15;

    for (let i = 0; i < this.room_count; i++) {
      let room = {
        x: 0,
        y: 0,
        w: 0,
        h: 0, 
      };

      room.x = Helpers.GetRandom(1, this.map_size - max_size - 1);
      room.y = Helpers.GetRandom(1, this.map_size - max_size - 1);
      room.w = Helpers.GetRandom(min_size, max_size);
      room.h = Helpers.GetRandom(min_size, max_size);

      if (this.DoesCollide(room)) {
        i--;
        continue;
      }
      room.w--;
      room.h--;

      this.rooms.push(room);
    }

    this.SquashRooms();

    for (let i = 0; i < this.room_count; i++) {
      let roomA = this.rooms[i];
      let roomB = this.FindClosestRoom(roomA) as Room;

      const pointA = {
        x: Helpers.GetRandom(roomA.x, roomA.x + roomA.w),
        y: Helpers.GetRandom(roomA.y, roomA.y + roomA.h)
      };
      const pointB = {
        x: Helpers.GetRandom(roomB.x, roomB.x + roomB.w),
        y: Helpers.GetRandom(roomB.y, roomB.y + roomB.h)
      };

      while ((pointB.x != pointA.x) || (pointB.y != pointA.y)) {
        if (pointB.x != pointA.x) {
          if (pointB.x > pointA.x) pointB.x--;
          else pointB.x++;
        } else if (pointB.y != pointA.y) {
          if (pointB.y > pointA.y) pointB.y--;
          else pointB.y++;
        }

        this.map[pointB.x][pointB.y] = 1;
      }
    }

    for (let i = 0; i < this.room_count; i++) {
      let room = this.rooms[i];
      for (let x = room.x; x < room.x + room.w; x++) {
        for (let y = room.y; y < room.y + room.h; y++) {
          this.map[x][y] = 1;
        }
      }

      if (i == this.current_room - 1) {
        const x = room.x + Math.floor(room.w / 2)
        const y = room.y + Math.floor(room.h / 2)
        this.map[x][y] = 3;
      }
    }

    for (let x = 0; x < this.map_size; x++) {
      for (let y = 0; y < this.map_size; y++) {
        if (this.map[x][y] !== 1) continue
        for (let xx = x - 1; xx <= x + 1; xx++) {
          for (let yy = y - 1; yy <= y + 1; yy++) {
            if (this.map[xx][yy] == 0) this.map[xx][yy] = 2;
          }
        }
      }
    }
  }

  FindClosestRoom(room: Room) {
    let mid = {
      x: room.x + (room.w / 2),
      y: room.y + (room.h / 2)
    };
    let closest = null;
    let closest_distance = 1200;
    for (let i = 0; i < this.rooms.length; i++) {
      let check = this.rooms[i];
      if (check == room) continue;
      let check_mid = {
        x: check.x + (check.w / 2),
        y: check.y + (check.h / 2)
      };

      let distance = Math.min(Math.abs(mid.x - check_mid.x) - (room.w / 2) - (check.w / 2), Math.abs(mid.y - check_mid.y) - (room.h / 2) - (check.h / 2));
      if (distance < closest_distance) {
        closest_distance = distance;
        closest = check;
      }
    }
    return closest;
  }

  SquashRooms() {
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < this.rooms.length; j++) {
        let room = this.rooms[j];
        let old_position = {
          x: room.x,
          y: room.y
        }
        while (!this.DoesCollide(room, j)) {
          if (room.x > 1) room.x--;
          if (room.y > 1) room.y--;
          if ((room.x === 1) && (room.y === 1)) break;
        }
        room.x = old_position.x;
        room.y = old_position.y;
      }
    }
  }

  DoesCollide(room: Room, ignore = -1) {
    for (let i = 0; i < this.rooms.length; i++) {
      if (i === ignore) continue;
      let check = this.rooms[i];
      const doesOverlap = !(
        (room.x + room.w < check.x)
          || (room.x > check.x + check.w)
          || (room.y + room.h < check.y)
          || (room.y > check.y + check.h)
      )
      if (doesOverlap) return true;
    }
    return false;
  }
}

export class Renderer {
  canvas: HTMLCanvasElement
  canvasId: string = ''
  ctx: CanvasRenderingContext2D | null = null
  map: Map = []
  map_size: number = 64
  scale: number = 0
  size: number = 512

  constructor(dungeon: Dungeon, canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.map = dungeon.map
    this.map_size = dungeon.map_size
  }

  Initialize () {
    if (!this.canvas) throw new Error('canvas not found')
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this.ctx = this.canvas.getContext('2d');
    this.scale = this.canvas.width / this.map_size;
  }

  Update () {
    for (let y = 0; y < this.map_size; y++) {
      for (let x = 0; x < this.map_size; x++) {
        let tile = this.map[x][y];
        if (!this.ctx) throw new Error('ctx not found')
        switch (tile) {
          case 0:
            this.ctx.fillStyle = 'white';
            break;
          case 1:
            this.ctx.fillStyle = '#DEEEEE';
            this.ctx.fillRect(x * this.scale, y * this.scale, this.scale, this.scale);
            break;
          case 2:
            this.ctx.fillStyle = '#DEEEEE';
            this.ctx.strokeRect(x * this.scale, y * this.scale, this.scale, this.scale);
            break;
          case 3:
            this.ctx.fillStyle = 'teal';
            this.ctx.fillRect(x * this.scale, y * this.scale, this.scale, this.scale);
        }
      }
    }
  }
}

const Helpers = {
  GetRandom: function (low: number, high: number) {
    return~~ (Math.random() * (high - low)) + low;
  }
}

export const generateRandomDungeon = (canvas: HTMLCanvasElement | null) => {
  if (!canvas) return ''
  const dungeon = new Dungeon()
  dungeon.Generate()
  const renderer = new Renderer(dungeon, canvas)
  renderer.Initialize()
  renderer.Update()
  return renderer.canvas?.toDataURL('image/png') || ''
}