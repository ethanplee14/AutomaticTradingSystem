

export function mockResolved(mockedEndpoint: jest.Mock, body: any) {
    return mockedEndpoint.mockResolvedValue({body})
}

export function mockResolvedOnce(mockedEndpoint: jest.Mock, body: any) {
    return mockedEndpoint.mockResolvedValueOnce({body})
}