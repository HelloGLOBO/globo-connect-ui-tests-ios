export interface UserData {
    id: string;
    email: string;
    password: string;
}

export interface TestData {
    INTERPRETER: UserData;
    USER: UserData;
}

export interface Dashboards {
    interpreter_dashboard: string;
}

export const userData: TestData = {
    INTERPRETER: {
        id: "interpreter1",
        email: "maximiliano.sosa.wideman+inter1@helloglobo.com",
        password: "Prueba1234*",
    },
    USER: {
        id: "user1",
        email: "maximiliano.sosa.wideman+ai@helloglobo.com",
        password: "Prueba1234*",
    },
};

export const dashboards: Dashboards = {
    interpreter_dashboard: "/linguist_dashboard/index",
};
