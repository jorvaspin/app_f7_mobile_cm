import { axiosApiInstance } from "@/js/axios";
import store from "@/store/store";
import { f7 } from "framework7-vue";
import { showAlertError } from "./useHelpersFunctions";

export async function createQuiz(): Promise<String | any> {

    // f7.dialog.preloader("Creando trivia...");
    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'post',
            url: '/api/auth/students/v3/user/trivias/create',
            data: {
                tipo_trivia: 2,
                asignatura: 1,
                language: 1

            },
        })
        // f7.dialog.close();
        return data;

    } catch (error) {
        f7.dialog.close();
        showAlertError('No se pudo crear la trivia');
        console.log('No se pudo crear la trivia de nivelación:', error);
    }
}


export async function createQuizTof(): Promise<String | any> {

    f7.dialog.preloader("Creando quiz TOF...");
    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'post',
            url: '/api/auth/students/v3/user/quiz_tof/create',
            data: {
                quiz_tipo_id: 4,
                quiz_step_id: 3
            },
        })
        f7.dialog.close();
        return data;

    } catch (error) {
        f7.dialog.close();
        showAlertError('No se pudo crear la trivia');
        console.log('No se pudo crear la trivia TOF:', error);
    }
}

export async function createLessonQuiz(tematicaId: number): Promise<any> {
    // f7.dialog.preloader("Iniciando la trivia...");
    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'post',
            url: '/api/auth/students/v3/user/trivias/create',
            data: {
                tipo_trivia: 1,
                asignatura: store.state.asignaturaTriviaTematica,
                language: 1,
                tematica_id: tematicaId
            },
        })
        return data;
    } catch (error) {
        // f7.dialog.close();
        // showAlertError('No se pudo crear la trivia');
        console.log('No se pudo crear la trivia de temática:', error);
    }
}





//transformamos a minutos y segundos el new count
export function transformSlotPropsCountdown(props: { [s: string]: unknown; } | ArrayLike<unknown>) {
    const formattedProps = {};

    Object.entries(props).forEach(([key, value]) => {
      formattedProps[key] = value < 10 ? `0${value}` : String(value);
    });

    return formattedProps;
};


// metodo para responder las preguntas validadoras de true or false
export async function answerTofValidator(answer: number, lesson_id: number, pregunta_id: number, step_id: number): Promise<any> {
    // f7.dialog.preloader("Verificando respuesta...");
    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'post',
            url: '/api/auth/students/v3/user/library/lessons/tof/answer-response',
            data: {
                answer: answer,
                lesson_id: lesson_id,
                pregunta_id: pregunta_id,
                step_id: step_id
            },
        })
        return data;
    } catch (error) {
        f7.dialog.close();
        showAlertError('Hubo un error al verificar la respuesta.');
    }
}
