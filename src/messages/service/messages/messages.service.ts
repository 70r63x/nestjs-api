import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessagesDto } from 'src/messages/dto/create-messages-dto';
import { Message } from 'src/messages/entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private messagesRepository: Repository<Message>,
      ) {}

    async geAll(): Promise<Message[]>{
        return await this.messagesRepository.find();
    }

    async createMessage(newMessage: CreateMessagesDto): Promise<Message>{
        const newMessageD = new Message();
        newMessageD.message = newMessage.message;
        newMessageD.nick = newMessage.nick;
        console.log(newMessageD);

        return this.messagesRepository.save(newMessageD);
    }

    async updateMessage(id: number, updateMessage: CreateMessagesDto): Promise<Message>{
        const updateMessageD = await this.messagesRepository.findOne(id);
        updateMessageD.message = updateMessage.message;
        updateMessageD.nick = updateMessage.nick;

        return await this.messagesRepository.save(updateMessageD);
    }

    async deleteMessage(id: number): Promise<any>{
        return await this.messagesRepository.delete(id);
    }
}
