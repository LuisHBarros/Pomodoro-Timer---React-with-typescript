import { Play } from "phosphor-react"
import React from "react"
import { zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod" 
import {
    HomeContainer,
    FormContainer,
    CountdownContainer,
    Separator,
    StartCountdownButton,
    MinutesAmountInput,
    TaskInput
} from "./styles"
import { useForm } from 'react-hook-form';

const newCycleFormValidation = z.object({
    task: z.string().min(3, "O campo não pode estar vazio"),
    minutesAmount: z.number().int().min(5, "O tempo mínimo é de 5 minutos")
        .max(60, "O tempo máximo é de 60 minutos")
});


type NewCycleFormData = z.infer<typeof newCycleFormValidation>; 

export function Home() {

    const { register, handleSubmit, watch, reset,  } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidation),
        defaultValues: {
            minutesAmount: 0,
            task: ''
        }
    });

    function handleCreateNewCycle(data: NewCycleFormData) {
        console.log(data);
        reset();
    }
    const task = watch('task');

    const isSubmitButtonDisabled = !task;


    return (
        <HomeContainer>
            <FormContainer action={""} onSubmit={handleSubmit(handleCreateNewCycle)}>
                <div>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput type="text" id="task" placeholder="Dê um nome para o seu projeto"
                        {...register('task')} />
                    <label htmlFor="time">durante</label>
                    <MinutesAmountInput type="number" id="time" step="5" placeholder="00" min={5} max={60}
                        {...register('minutesAmount', {valueAsNumber: true})}
                    />
                    <span>minutos.</span>
                </div>
                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>
                        <span>:</span>
                    </Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>
                <StartCountdownButton disabled={isSubmitButtonDisabled} type="submit"><Play size={24} />Começar</StartCountdownButton>
            </FormContainer>
        </HomeContainer>
    );
}