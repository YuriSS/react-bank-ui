import { TransactionApi } from "@/bank-statement/domain/api/transaction/transaction.api";
import { ListTransactionUsecaseFactory } from "@/bank-statement/domain/use-case/list-transaction/list-transaction.use-case";

describe("Unit: list transactions", () => {
  it("should make a transaction", async () => {
    const request = {
      get: jest.fn().mockReturnValue(Promise.resolve({ transactions: [1, 2] })),
      post: jest.fn(),
      put: jest.fn(),
    };

    const createTranasctionUsecase = {
      execute: jest.fn().mockReturnValue({ id: "transactionId" }),
    };

    const api: TransactionApi = { list: "/transaction/list" } as TransactionApi;

    const output = await ListTransactionUsecaseFactory.create(
      request,
      api,
      createTranasctionUsecase
    ).execute({});

    expect(request.get).toHaveBeenCalledTimes(1);
    expect(request.get).toHaveBeenCalledWith(api.list, {});

    expect(createTranasctionUsecase.execute).toHaveBeenCalledTimes(2);
    expect(createTranasctionUsecase.execute.mock.calls).toEqual([[1], [2]]);

    expect(output).toEqual([{ id: "transactionId" }, { id: "transactionId" }]);
  });
});
