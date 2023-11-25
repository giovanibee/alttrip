'use server'

import prisma from 'lib/prisma'

const create = async (code: string) => {
	if (!code) throw new Error('Code required')
	await prisma.inviteCode.create({
		data: { code },
	})
}

const deleteInviteCode = async (id: number) =>
	prisma.inviteCode.delete({
		where: { id },
	})

// doesn't currently get stories by proximity
// TODO: implement proximity
const getAll = () => prisma.inviteCode.findMany()

const getByCode = async (code: string) => {
	return prisma.inviteCode.findUnique({
		where: { code },
	})
}

const updateRedeemedById = (id: number, isRedeemed = true) =>
	prisma.inviteCode.update({ where: { id }, data: { isRedeemed } })

export {
	create,
  deleteInviteCode,
	getAll,
  getByCode,
	updateRedeemedById,
}
