import {useState} from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isDone, setIsDone] = useState(false)
    const [error, setError] = useState(null)

    const fetching = async (...args) => {
        try {
            setIsLoading(true)
            await callback(...args)
        }
        catch (e){
            setError(e.message)
        }
        finally {
            setIsLoading(false)
            setIsDone(true)
        }
    }

    return [fetching, isLoading, error, isDone]
}