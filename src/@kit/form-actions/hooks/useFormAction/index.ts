import {
    type UseMutationOptions,
    type UseMutationResult,
    useMutation,
} from "@tanstack/react-query";

type UseMutationSettingsProps<TData, TVariables> = {
    fn: (variables: TVariables) => Promise<TData>;
    options?: Omit<
        UseMutationOptions<TData, Error, TVariables>,
        "mutationFn"
    >;
};

export const useFormActionSettings = <TData, TVariables>({
    fn,
    options,
}: UseMutationSettingsProps<TData, TVariables>): UseMutationResult<
    TData,
    Error,
    TVariables
> => {
    return useMutation({
        mutationFn: fn,
        ...options,
    });
};