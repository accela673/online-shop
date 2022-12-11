import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/users.dto';
import { UsersEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly userRepo: Repository<UsersEntity>
    ){}


    async createUser(user: CreateUserDto){
        const newUser = await this.userRepo.findOne({where:{username: user.username}})
        if(newUser) throw new BadRequestException(`User ${user.username} is already exists`)
        return await this.userRepo.save(user);
      }
}


