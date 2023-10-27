-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "location" DECIMAL(65,30)[] DEFAULT ARRAY[43.09674, -89.51127]::DECIMAL(65,30)[],
    "rating" INTEGER DEFAULT 0,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quest" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "hasBeenVisited" BOOLEAN NOT NULL DEFAULT false,
    "deadline" TIMESTAMP(3),
    "description" TEXT,
    "placeId" INTEGER,
    "name" TEXT NOT NULL DEFAULT 'New Task',
    "questId" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Place_userId_key" ON "Place"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Place_name_userId_key" ON "Place"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Quest_userId_key" ON "Quest"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Quest_name_userId_key" ON "Quest"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_placeId_key" ON "Task"("placeId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_name_questId_key" ON "Task"("name", "questId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

