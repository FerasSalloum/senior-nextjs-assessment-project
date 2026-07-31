import { IUserRepository } from "@/src/domain/repositories/IUserRepository";
import { prisma } from "@/src/lib/prisma";
import { Users } from "@prisma/client";
export class PrismaUserRepository implements IUserRepository{
     async findByEmail(email: string): Promise<Users | null>{
        return await prisma.users.findUnique({where:{email}})
     }
  async findById(id: string): Promise<Users | null>{
    return await prisma.users.findUnique({where:{id}})
  }
  async create(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<Users>{
    return await prisma.users.create({data:{
        name:data.name,
        email:data.email,
        password:data.password
    }})
  }
}