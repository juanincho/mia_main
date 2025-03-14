/* LLAMADAS A LA API*/
// const URL1 = "https://mianoktos.vercel.app";
// const URL = "http://localhost:3000";
// const URL2 = "http://localhost:3001";
// const ROUTES = {
//   stripe: "/v1/stripe",
//   solicitud: "/v1/solicitud",
//   agentes: "/v1/agentes"
// };
// const ENDPOINTS = {
//   createAgente: "/create",
// };
const API_KEY =
  "nkt-U9TdZU63UENrblg1WI9I1Ln9NcGrOyaCANcpoS2PJT3BlbkFJ1KW2NIGUYF87cuvgUF3Q976fv4fPrnWQroZf0RzXTZTA942H3AMTKFKJHV6cTi8c6dd6tybUD65fybhPJT3BlbkFJ1KW2NIGPrnWQroZf0RzXTZTA942H3AMTKFy15whckAGSSRSTDvsvfHsrtbXhdrT";
const AUTH = {
  "x-api-key": API_KEY,
};

export const createAgente = async (data: any, id: string) => {
  console.log(data.primer_nombre);
  try {
    const response = await fetch(`http://localhost:3001/v1/mia/agentes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...AUTH,
      },
      body: JSON.stringify({
        name: data.primer_nombre,
        secondName: data.segundo_nombre,
        lastname1: data.apellido_paterno,
        lastname2: data.apellido_materno,
        email: data.correo,
        phone: data.telefono,
        password: data.password,
        gender: data.genero,
        id: id
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.message === "Agente creado correctamente") {
      return ({
        success: true
      })
    }
    else {
      return ({
        success: false
      })
    }
  } catch (error) {
    throw error;
  }
}

export const createEmpresa = async (data: any, id: string) => {
  const nombreEmpresa = data.primer_nombre + " " + data.segundo_nombre + " " + data.apellido_paterno + " " + data.apellido_materno;
  try {
    const response = await fetch(`http://localhost:3001/v1/mia/empresas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...AUTH,
      },
      body: JSON.stringify({
        agente_id: id,
        razon_social: nombreEmpresa,
        nombre_comercial: nombreEmpresa,
        tipo_persona: "fisica",
        direccion: " ",
      }),
    });

    const json = await response.json();
    if (json.message === "Agente creado correctamente") {
      return ({
        success: true,
        empresa_id: json.data.id_empresa
      })
    }
    else {
      return ({
        success: false
      })
    }
  }
  catch (error) {
    throw error;
  }
}

export const createNewEmpresa = async (data: any, id: string) => {
  try {
    const response = await fetch(`http://localhost:3001/v1/mia/empresas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...AUTH,
      },
      body: JSON.stringify({
        agente_id: id,
        razon_social: data.razon_social,
        nombre_comercial: data.nombre_comercial,
        tipo_persona: data.tipo_persona,
        direccion: data.direccion,
      }),
    });

    const json = await response.json();
    if (json.message === "Agente creado correctamente") {
      return ({
        success: true,
        empresa_id: json.data.id_empresa
      })
    }
    else {
      return ({
        success: false
      })
    }
  }
  catch (error) {
    throw error;
  }
}

// export const createViajero = async (data: any, id_empresa: string) => {
//   try {
//     const response = await fetch(`http://localhost:3001/v1/mia/viajeros`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         ...AUTH,
//       },
//       body: JSON.stringify({
//         id_empresa: id_empresa,
//         primer_nombre: data.primer_nombre,
//         segundo_nombre: data.segundo_nombre,
//         apellido_paterno: data.apellido_paterno,
//         apellido_materno: data.apellido_materno,
//         correo: data.correo,
//         telefono: data.telefono,
//         genero: "masculino",
//         fecha_nacimiento: "2001-09-25 00:00:00",
//       }),
//     });

//     const json = await response.json();
//     console.log(json);
//     if (json.message === "Viajero creado correctamente") {
//       return ({
//         success: true
//       })
//     }
//     else {
//       return ({
//         success: false
//       })
//     }
//   }
//   catch (error) {
//     throw error;
//   }
// }

export const createNewViajero = async (data: any, id_empresa: string) => {
  const fechaNacimiento = new Date(data.fecha_nacimiento);
  const fechaFormateada = fechaNacimiento.toISOString().split("T")[0] + " 00:00:00";
  try {
    console.log(data);
    const response = await fetch(`http://localhost:3001/v1/mia/viajeros`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...AUTH,
      },
      body: JSON.stringify({
        id_empresa: id_empresa,
        primer_nombre: data.primer_nombre,
        segundo_nombre: data.segundo_nombre || " ",
        apellido_paterno: data.apellido_paterno,
        apellido_materno: data.apellido_materno || " ",
        correo: data.correo,
        telefono: data.telefono,
        genero: data.genero,
        fecha_nacimiento: fechaFormateada,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.message === "Viajero creado correctamente") {
      return ({
        success: true
      })
    }
    else {
      return ({
        success: false
      })
    }
  }
  catch (error) {
    throw error;
  }
}

export const getCompaniesAgent = async (agent_id: string) => {
  try {
    console.log("En proceso de obtener empresas")
    const response = await fetch(`http://localhost:3001/v1/mia/agentes/empresas-con-agentes?id_agente=${encodeURIComponent(agent_id)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...AUTH,
      },
    });

    const json = await response.json();
    return json;
  }
  catch (error) {
    throw error;
  }
}

export const getCompaniesAgentViajeros = async (agent_id: string) => {
  try {
    console.log("En proceso de obtener viajeros")
    const response = await fetch(`http://localhost:3001/v1/mia/agentes/viajeros-con-empresas?id_agente=${encodeURIComponent(agent_id)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...AUTH,
      },
    });

    const json = await response.json();
    console.log(json);
    return json;
  }
  catch (error) {
    throw error;
  }
}

