import { getUser } from "@/services/AuthService"
import { useQuery } from "@tanstack/react-query"

export const userAuth = () => {
    const { data , isLoading, isError} = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: false,
        refetchOnWindowFocus: false
    })

    return{ data, isLoading, isError}
}