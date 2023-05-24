import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { CryptocurrencyController } from '../controllers/cryptocurrency.controller';
import { CryptocurrencyService } from '../services/cryptocurrency.service';

describe('CryptocurrencyController', () => {
  let controller: CryptocurrencyController;
  let service: CryptocurrencyService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CryptocurrencyController],
      providers: [
        {
          provide: CryptocurrencyService,
          useValue: {
            findCryptocurrency: jest.fn().mockResolvedValue({
              id: 1,
              name: 'Bitcoin',
              createdDate: new Date(),
              updatedDate: new Date(),
              deletedDate: null,
            }),
          },
        },
      ],
    }).compile();

    controller = moduleRef.get<CryptocurrencyController>(
      CryptocurrencyController,
    );
    service = moduleRef.get<CryptocurrencyService>(CryptocurrencyService);
  });

  it('should return a cryptocurrency when it exists', async () => {
    const id = 1;
    const result = await controller.findCryptocurrency(id);
    expect(service.findCryptocurrency).toHaveBeenCalledWith(id);
    expect(result).toEqual({
      id: 1,
      name: 'Bitcoin',
      createdDate: expect.any(Date),
      updatedDate: expect.any(Date),
      deletedDate: null,
    });
  });

  it('should throw NotFoundException when cryptocurrency does not exist', async () => {
    const id = 50;
    jest
      .spyOn(service, 'findCryptocurrency')
      .mockRejectedValue(
        new NotFoundException(`cryptocurrency with id '${id}' not found`),
      );

    await expect(controller.findCryptocurrency(id)).rejects.toThrowError(
      NotFoundException,
    );
    expect(service.findCryptocurrency).toHaveBeenCalledWith(id);
  });

  it('should call the service with the correct ID when searching for a cryptocurrency', async () => {
    const id = 1;
    await controller.findCryptocurrency(id);
    expect(service.findCryptocurrency).toHaveBeenCalledWith(id);
  });
});
