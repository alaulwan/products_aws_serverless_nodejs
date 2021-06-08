import { useHooks, logEvent, parseEvent, handleUnexpectedError } from 'lambda-hooks'

export default function hooksWithValidation ({ pathSchema, bodySchema }) {
    return useHooks(
        {
            before: [logEvent, parseEvent, validateEventPath, validateEventBody],
            after: [],
            onError: [handleUnexpectedError]
        },
        {
            pathSchema,
            bodySchema
        }
    );
};

const validateEventPath = async state => {
    const pathSchema = state.config.pathSchema;
    if(pathSchema){
        try {
            const event = state.event;
            await pathSchema.validate(event.pathParameters, { strict: true });
        } catch (error) {
            console.log('yup valiation error of event.pathParameters', error);
            state.exit = true;
            state.response = { statusCode: 400, body: JSON.stringify({ error: error.message })};
        }
    }
    return state;
};

const validateEventBody = async state => {
    const bodySchema = state.config.bodySchema;
    if(bodySchema){
        try {
            const event = state.event;
            await bodySchema.validate(event.body, { strict: true });
        } catch (error) {
            console.log('yup valiation error of event.body', error);
            state.exit = true;
            state.response = { statusCode: 400, body: JSON.stringify({ error: error.message })};
        }
    }
    return state;
};
