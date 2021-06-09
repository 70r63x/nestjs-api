import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateMessagesDto } from 'src/messages/dto/create-messages-dto';
import { MessagesService } from './service/messages/messages.service';

@Controller('messages')
export class MessagesController {
    
    constructor(private messageService: MessagesService) {}



    @Post()
    create(@Body() createMessasgeDto: CreateMessagesDto, @Res() response){
        this.messageService.createMessage(createMessasgeDto)
        .then( message => {
            response.status(HttpStatus.CREATED).json(message);
        } 
        ).catch( () => {
            response.status(HttpStatus.FORBIDDEN).json({messageResp: 'Error to create'});
        });
    }

    @Get()
    getAll(@Res() response) {
        this.messageService.geAll().then(listMessages => {
            response.status(HttpStatus.OK).json(listMessages);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({messageResp: 'Error to get messages'});
        });
    }

    @Put(':id')
    update(@Body() updateMessageDto: CreateMessagesDto, @Res() response, @Param('id') idMessage) {
        this.messageService.updateMessage(idMessage, updateMessageDto).then(message => {
            response.status(HttpStatus.OK).json(message);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({messageResp: 'Error to update messages'});
        });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idMessage){
        this.messageService.deleteMessage(idMessage).then(resp => {
            response.status(HttpStatus.OK).json(resp);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({messageResp: 'Error to delete messages'});
        })
    }


}
