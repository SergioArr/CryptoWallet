import { Test } from '@nestjs/testing';
import { NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { TransactionController } from '../controllers/transaction.controller';
import { TransactionService } from '../services/transaction.service';
import { CreateTransactionDto } from 'src/common/dtos/createTransaction.dto';
import { GetTransactionDto } from 'src/common/dtos/getTransaction.dto';

describe('TransactionController', () => {
  let controller: TransactionController;
  let service: TransactionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: TransactionService,
          useValue: {
            createTransaction: jest.fn(),
            getTransactionByReceiver: jest.fn(),
            getTransactionBySender: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = moduleRef.get<TransactionController>(TransactionController);
    service = moduleRef.get<TransactionService>(TransactionService);
  });

  describe('createTransaction', () => {
    it('should create a transaction', async () => {
      const transactionDto: CreateTransactionDto = {
        cryptocurrency_id: 1,
        sender: 'aaaa-bbbb-cccc-dddd',
        receiver: 'dddd-cccc-bbbb-aaaa',
        amount: 10.5,
      };
      const createdTransaction: GetTransactionDto = {
        id: 1,
        cryptocurrency_id: 1,
        sender: 'aaaa-bbbb-cccc-dddd',
        receiver: 'dddd-cccc-bbbb-aaaa',
        amount: 10.5,
        createdDate: new Date(),
        updatedDate: new Date(),
        deletedDate: null,
        cryptocurrency: null
      };
      jest.spyOn(service, 'createTransaction').mockResolvedValue(createdTransaction);

      const result = await controller.createTransaction(transactionDto);

      expect(service.createTransaction).toHaveBeenCalledWith(transactionDto);
      expect(result).toEqual(createdTransaction);
    });

    it('should throw BadRequestException when a database constraint violation occurs', async () => {
      const transactionDto: CreateTransactionDto = {
        cryptocurrency_id: 20,
        sender: 'aaaa-bbbb-cccc-dddd',
        receiver: 'dddd-cccc-bbbb-aaaa',
        amount: 10.5,
      };
      const errorMessage = 'Some error message';
      jest.spyOn(service, 'createTransaction').mockRejectedValue(new BadRequestException());

      await expect(controller.createTransaction(transactionDto)).rejects.toThrowError(BadRequestException);
      expect(service.createTransaction).toHaveBeenCalledWith(transactionDto);
    });
    
  });

  describe('getTransactionByReceiver', () => {
    it('should return transactions for the given receiver ID', async () => {
      const receiverId = 'dddd-cccc-bbbb-aaaa';
      const transactions: GetTransactionDto[] = [
        {
          id: 1,
          cryptocurrency_id: 1,
          sender: 'aaaa-bbbb-cccc-dddd',
          receiver: 'dddd-cccc-bbbb-aaaa',
          amount: 10.5,
          createdDate: new Date(),
          updatedDate: new  Date(),
          deletedDate: null,
          cryptocurrency: null
        },
        {
          id: 2,
          cryptocurrency_id: 2,
          sender: 'aaaa-bbbb-cccc-dddd',
          receiver: 'dddd-cccc-bbbb-aaaa',
          amount: 20.5,
          createdDate: new Date(),
          updatedDate: new Date(),
          deletedDate: null,
          cryptocurrency: null
        },
      ];
      jest.spyOn(service, 'getTransactionByReceiver').mockResolvedValue(transactions);

      const result = await controller.getTransactionByReceiver(receiverId);

      expect(service.getTransactionByReceiver).toHaveBeenCalledWith(receiverId);
      expect(result).toEqual(transactions);
    });

    it('should throw NotFoundException when no transactions are found for the given receiver ID', async () => {
      const receiverId = 'dddd-cccc-bbbb-aaaa';
      jest.spyOn(service, 'getTransactionByReceiver').mockRejectedValue(new NotFoundException());

      await expect(controller.getTransactionByReceiver(receiverId)).rejects.toThrowError(NotFoundException);
      expect(service.getTransactionByReceiver).toHaveBeenCalledWith(receiverId);
    });

    
  });

  describe('getTransactionBySender', () => {
    it('should return transactions for the given sender ID', async () => {
      const senderId = 'aaaa-bbbb-cccc-dddd';
      const transactions: GetTransactionDto[] = [
        {
          id: 1,
          cryptocurrency_id: 1,
          sender: 'aaaa-bbbb-cccc-dddd',
          receiver: 'dddd-cccc-bbbb-aaaa',
          amount: 10.5,
          createdDate: new Date(),
          updatedDate: new Date(),
          deletedDate: null,
          cryptocurrency: null
        },
        {
          id: 2,
          cryptocurrency_id: 2,
          sender: 'aaaa-bbbb-cccc-dddd',
          receiver: 'eeee-ffff-gggg-hhhh',
          amount: 20.5,
          createdDate: new Date(),
          updatedDate: new Date(),
          deletedDate: null,
          cryptocurrency: null
        },
      ];
      jest.spyOn(service, 'getTransactionBySender').mockResolvedValue(transactions);

      const result = await controller.getTransactionBySender(senderId);

      expect(service.getTransactionBySender).toHaveBeenCalledWith(senderId);
      expect(result).toEqual(transactions);
    });

    it('should throw NotFoundException when no transactions are found for the given sender ID', async () => {
      const senderId = 'aaaa-bbbb-cccc-dddd';
      jest.spyOn(service, 'getTransactionBySender').mockRejectedValue(new NotFoundException());

      await expect(controller.getTransactionBySender(senderId)).rejects.toThrowError(NotFoundException);
      expect(service.getTransactionBySender).toHaveBeenCalledWith(senderId);
    });

  });
});