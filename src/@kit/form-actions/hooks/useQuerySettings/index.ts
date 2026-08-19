import {
	useQuery,
	type QueryKey,
	type UseQueryOptions,
	type UseQueryResult,
} from "@tanstack/react-query";

const THIRTY_MINUTES = 30 * 60 * 1000;

type QueryOptions<TData> = Omit<
	UseQueryOptions<TData>,
	"queryKey" | "queryFn"
> & {
	queryKey?: QueryKey;
};

type UseQuerySettingsProps<TData, TParams = void> =
	TParams extends void
		? {
				fn: () => Promise<TData>;
				options?: QueryOptions<TData>;
			}
		: {
				fn: (params: TParams) => Promise<TData>;
				params: TParams;
				options?: QueryOptions<TData>;
			};

export function useQuerySettings<TData, TParams = void>(
	props: UseQuerySettingsProps<TData, TParams>,
): UseQueryResult<TData> {
	const queryKey =
		props.options?.queryKey ??
		("params" in props ? [props.fn.name, props.params] : [props.fn.name]);

	return useQuery<TData>({
		queryKey,
		queryFn: () =>
			"params" in props ? props.fn(props.params) : props.fn(),
		staleTime: THIRTY_MINUTES,
		refetchInterval: THIRTY_MINUTES,
		...props.options,
	});
}