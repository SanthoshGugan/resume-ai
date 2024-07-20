import React from "react";
import { useForm } from "react-hook-form";

const useResumeAI = () => {

    const {
        handleSubmit,
        register
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = (values) => {
        console.log(`values ::::  ${values}`, values);
    };


    return {
        handleSubmit,
        register,
        onSubmit
    };
};

export default useResumeAI;
