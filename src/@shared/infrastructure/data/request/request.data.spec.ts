import { FetchData } from "@/@shared/infrastructure/data/request/request.data";

describe("Unit: Request data", () => {
  const parseJsonMock = { json: jest.fn() };

  beforeEach(() => {
    global.fetch = jest.fn(() => {
      return Promise.resolve(parseJsonMock as unknown as Response);
    });
  });

  it("should do a get", async () => {
    const result = { test: "123" };
    const getParams = {
      url: "/test",
      params: { queryParam: 1 },
    };
    const request = new FetchData();
    parseJsonMock.json.mockReturnValue(result);

    const output = await request.get(getParams.url, getParams.params);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(parseJsonMock.json).toHaveBeenCalledTimes(1);

    expect(fetch).toHaveBeenCalledWith(`${getParams.url}?queryParam=1`);
    expect(parseJsonMock.json).toHaveBeenCalledWith();

    expect(output).toBe(result);
  });
});
