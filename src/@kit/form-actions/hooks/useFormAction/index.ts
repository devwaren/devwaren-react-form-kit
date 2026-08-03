import {
    type MutationKey,
    type QueryKey,
    type UseMutationOptions,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

type UseFormActionSettingsProps<TData, TVariables> = {
    fn: (variables: TVariables) => Promise<TData>;
    options?: Omit<
        UseMutationOptions<TData, Error, TVariables>,
        "mutationFn" | "mutationKey"
    > & {
        key?: MutationKey;
        invalidateFrom?: QueryKey[];
    };
};

export const useFormActionSettings = <TData, TVariables>({
    fn,
    options,
}: UseFormActionSettingsProps<TData, TVariables>) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: fn,
        mutationKey: options?.key ?? [fn.name],
        ...options,
        onSuccess: async (
            data,
            variables,
            onMutateResult,
            context,
        ) => {
            if (options?.invalidateFrom?.length) {
                await Promise.all(
                    options.invalidateFrom.map(queryKey =>
                        queryClient.invalidateQueries({ queryKey }),
                    ),
                );
            }

            await options?.onSuccess?.(
                data,
                variables,
                onMutateResult,
                context,
            );
        },
    });
};