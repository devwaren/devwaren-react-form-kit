import {
    type UseQueryOptions,
    type UseQueryResult,
    useQueries,
} from "@tanstack/react-query";

type QueryConfig<TData, TParams> = {
    fn: (params?: TParams) => Promise<TData>;
    params?: TParams;
    options?: Omit<UseQueryOptions<TData>, "queryKey" | "queryFn">;
};

export const useQueriesSettings = <
    const T extends readonly QueryConfig<any, any>[],
>(
    queries: T,
) => {
    return useQueries({
        queries: queries.map(({ fn, params, options }) => ({
            queryKey: params ? [fn.name, params] : [fn.name],
            queryFn: () => fn(params),
            ...options,
        })),
    });
};