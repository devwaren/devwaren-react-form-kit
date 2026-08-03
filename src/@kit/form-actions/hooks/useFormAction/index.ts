import {
    type QueryKey,
    useMutation,
    useQueryClient,
    type UseMutationOptions,
} from "@tanstack/react-query";

type UseFormActionSettingsProps<TData, TVariables> = {
    fn: (variables: TVariables) => Promise<TData>;
    invalidateFrom?: QueryKey | QueryKey[];
    options?: Omit<
        UseMutationOptions<TData, Error, TVariables>,
        "mutationFn"
    >;
};

export const useFormActionSettings = <TData, TVariables>({
    fn,
    invalidateFrom,
    options,
}: UseFormActionSettingsProps<TData, TVariables>) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: fn,
        ...options,
        onSuccess: async (
            data,
            variables,
            onMutateResult,
            context,
        ) => {
            if (invalidateFrom) {
                const keys = Array.isArray(invalidateFrom[0])
                    ? (invalidateFrom as QueryKey[])
                    : [invalidateFrom as QueryKey];

                await Promise.all(
                    keys.map(queryKey =>
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

    return mutation;
};