export abstract class SignupInputs {
    protected abstract username: string;
    protected abstract name: string;
    protected abstract email: string;
    protected abstract password: string;
    protected abstract phone_number: string;
    protected abstract phone_code: string;
    protected abstract nationality: string;
    protected abstract createdAt: Date;
    protected abstract updatedAt: Date;
};