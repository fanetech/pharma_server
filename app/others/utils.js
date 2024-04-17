const path = require("path");

module.exports = {
    setUpdateObject: (data, updateObject) => {
        for (let key in updateObject) {
            if (updateObject[key] !== undefined) {
                data[key] = updateObject[key];
            }
        }
        return data;
    }
    ,
    serverRootDir: (filename) => {
        return path.dirname(path.basename(path.dirname(filename)));
    },
    appRootDataDir: () => {
        var appName = process.env.APP_NAME || "pharma-server";
        var dataRootDir;
        switch (process.platform) {
            case "darwin":
                dataRootDir = path.join(process.env.HOME, "/Library/Preferences", appName);
                break;
            case "linux":
                dataRootDir = path.join(process.env.HOME, appName);
                break;
            case "win32":
                dataRootDir = path.join(process.env.APPDATA, appName);
                break;
            default:
                dataRootDir = appName;
                break;
        }
        return dataRootDir;
    },
    isEmpty: (value) => {
        return (
            value === undefined ||
            value === null ||
            (typeof value === "object" && Object.keys(value).length === 0) ||
            (typeof value === "string" && value.trim().length === 0)
        );
    },
    responseConstructor: (code, data, message) => {
        let response = { send: { entete: { code: null, msg: "" }, docs: null }, status: 502 }
        response.send.docs = data ?? null
        let error = codeError.find(d => d.code === code)
        if (!error) {
            return response;
        }

        if (message) {
            response.send.entete.code = error.code
            response.send.entete.msg = `${error.msg} ${message}.`
        } else {
            response.send.entete = error
        }

        if (code >= STATUS_CODE_bis.SUCCESS && code <= STATUS_CODE_bis.SUCCESS) {
            response.status = SERVER_STATUS.SUCCESS;

        } else if (STATUS_CODE_bis.UNEXPECTED_ERROR && code < STATUS_CODE_bis.NOT_DATA) {
            response.status = SERVER_STATUS.UNEXPECTED_ERROR;

        } else if (code >= STATUS_CODE_bis.NOT_DATA) {
            response.status = SERVER_STATUS.NOT_DATA;

        } else {
            response.status = SERVER_STATUS.SERVICE_UNAVAILABLE;
        }
        return response
    },

    STATUS_CODE: {
        SUCCESS: 0,
        UNEXPECTED_ERROR: 1000,
        UNEXPECTED_ERROR_DB: 1001,
        NOT_DATA: 2000,
        DATA_INCORRECT: 2001,
        DATA_REQUIS: 2002,
        DATA_EXIST: 3000,
        NOT_FOUND: 4000,
    },
    specificError: {
        REGISTER_EMAIL_OR_NUMBER_NO_EXIST: "email ou numéro de téléphone existant!",
        ID_DATA_REQUIRED: "identifiants requis!",
        PASSWORD_ERROR: "mot de passe court!",
        INCORRECT_ROLE: (roleUsed) => "role incorect. utiliser " + Object.values(roleUsed).toString(),
        USER_LOGIN_DATA_ERROR: "identifiants incorrect!",
        SCHOOL_CREATE_MISSING_DATA: "nom de établissement, slogan ou un fondateur",
        GET_USER_BY_ID_NOT_FOUND: "utilisateur non trouvé!",
        USER_REQUIREMENT_EXCEPTION_SCHOOL_CREATE: "pour le titulaire de l'etablissement, veuillez mettre à jour votre profile: nom, prénom, numéro de téléphone, email, adresse, role=fondateur",
        DATA_REQUIRED: "données indispensable incorect",
        SCHOOL_NOT_FOUND: "etablissement non trouvé!",
        SCHOOL_YEAR_NOT_FOUND: "Année scolaire non trouvé",
        CLASSROOM_NOT_FOUND: "classe non trouvé",
        ACTOR_NOT_FOUND: "acteur non trouvé!",
        SCHOOL_YEAR_PERIOD_NOT_FOUND: "période scolaire non trouvé!",
        SCHOOL_YEAR_DEADLINE_NOT_FOUND: "éheance scolaire non trouvé!",
        SCHOOL_YEAR_PERIOD_NDIVISION_ERROR: "nDivision ne doit pas être supérieur au nDivision de l'année scolaire!",
        FIELD_NOT_EMPTY: "cette action nécessite la suppression de certaines données!",
    },


}

const STATUS_CODE_bis= {
    SUCCESS: 0,
    UNEXPECTED_ERROR: 1000,
    UNEXPECTED_ERROR_DB: 1001,
    NOT_DATA: 2000,
    DATA_INCORRECT: 2001,
    DATA_REQUIS: 2002,
    DATA_EXIST: 3000,
    NOT_FOUND: 4000,
}

const codeError = [
    { code: STATUS_CODE_bis.SUCCESS, msg: "Opération effectuée avec succès!" },
    { code: STATUS_CODE_bis.UNEXPECTED_ERROR, msg: "Une erreur inattendu c'est produit! Veuillez reessayer!" },
    { code: STATUS_CODE_bis.UNEXPECTED_ERROR_DB, msg: "Une erreur c'est produit sur vos données!" },
    { code: STATUS_CODE_bis.NOT_DATA, msg: "Pas de données!" },
    { code: STATUS_CODE_bis.DATA_INCORRECT, msg: "Donnée incorrect!" },
    { code: STATUS_CODE_bis.DATA_EXIST, msg: "Donnée existant!" },
    { code: STATUS_CODE_bis.NOT_FOUND, msg: "Document non trouvé!" },
    { code: STATUS_CODE_bis.DATA_REQUIS, msg: "Donnée requis!" },
]

const SERVER_STATUS = {
    SUCCESS: 200,
    UNEXPECTED_ERROR: 500,
    NOT_FOUND: 404,
    DATA_INCORRECT: 400,
    NOT_DATA: 400,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
}