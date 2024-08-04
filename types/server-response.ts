export type TServerResponseWithPagination<T> = {
    message: string;
    success: boolean;
    data: {
        data: T[],
        total: number
    },
}