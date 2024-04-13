
module.exports.signUpErrors = (err) => {
    let errors = { number: "", email: "", password: "" };
  
    if (err.message.includes("number"))
      errors.number = "Numero incorrect ou déjà pris";
  
    if (err.message.includes("email")) errors.email = "Email incorrect";
  
    if (err.message.includes("password"))
      errors.password = "Le mot de passe doit faire 8 caractères minimum";
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("number"))
      errors.number = "Ce numero est déjà pris";
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
      errors.email = "Cet email est déjà enregistré";

      const r = `${errors.number} ${errors.password} ${errors.email}`
  
    return r;
  };
  
  module.exports.signInErrors = (err) => {
    let errors = { password: "", method: "" };
  
    if (err.message.includes("email") || err.message.includes("number"))
      errors.method = "Email ou numero inconnu";
  
    if (err.message.includes("password"))
      errors.password = "mot de passe invalide";
  
    return errors;
  };
module.exports.globalSatuts = (res, data) => {
    switch (data.status) {
      case 200:
        return res.status(200).json(data.send);
      case 500:
         return res.status(500).json(data.send);
      case 502:
         return res.status(502).json(data.send);
      case 503:
         return res.status(503).json(data.send);
      case 400:
         return res.status(400).json(data.send);
      case 404:
         return res.status(404).json(data.send);
    
      default:
        break;
    }
  
};
  
  module.exports.classroomError = (err) => {
    let errors = { totalPrice: "", schoolId: "", name: "" };

    if (err.message.includes("name"))
      errors.name = "Nom incorrect ou Existe déja";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("name"))
      errors.name = "Nom incorrect ou Existe déja";

    return errors;
  };