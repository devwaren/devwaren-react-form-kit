import {
    type QueryKey,
    type UseQueryOptions,
    type UseQueryResult,
    useQuery,
} from "@tanstack/react-query";

type UseQuerySettingsProps<TData, TParams> = {
    fn: (params?: TParams) => Promise<TData>;
    params?: TParams;
    options?: Omit<UseQueryOptions<TData>, "queryFn"> & {
        queryKey?: QueryKey;
    };
};

export const useQuerySettings = <TData, TParams>({
    fn,
    params,
    options,
}: UseQuerySettingsProps<TData, TParams>): UseQueryResult<TData> => {
    return useQuery({
        queryKey: options?.queryKey ?? (params ? [fn.name, params] : [fn.name]),
        queryFn: () => fn(params),
        ...options,
    });
};