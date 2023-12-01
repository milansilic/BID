export class CreateAccountModel {
    email: string;
    password: string;
    confirmPassword: string;
}

export class ForgotPasswordModel {
    email: string;
}

export class LoginModel {
    email: string;
    password: string;
}

export class ChangePasswordModel {
    oldPassword: string;
    newPassword: string;
    confirmedPassword: string;
}

export class ResetPasswordModel {
    newPassword: string;
    confirmPassword: string;
    resetCode: string;
}