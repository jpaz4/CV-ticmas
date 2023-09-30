let persona;

const cargarDatosPersona = () => {
   return new Promise((resolve, reject) => {
      $.ajax({
         url: 'https://randomuser.me/api/',
         dataType: 'json',
         success: function(data) {
            persona = data.results[0];
            resolve(persona);
         }});        
      });
   };

const cargarinformacionPersona = () => {
   return new Promise((resolve, reject) => {
      fetch('js/datos.json')
      .then(resp => resp.json())
      .then(info => resolve(info));
   })
   
};

function cargarEstudios() {
   
   let estudios = persona.informacion.estudios;
   const tabla = document.querySelector('#lista-usuarios');

      estudios.forEach(estudio => {
         const tr = document.createElement('tr');
         tr.classList = 'text-center';
      
         const td1 = document.createElement('td');
         td1.innerHTML += `<img src=${estudio.logo} alt="Avatar" style="width:50px">
                           <h6><b>${estudio.lugar}</b></h6>`;
         tr.appendChild(td1);       
         const td2 = document.createElement('td');
         td2.innerHTML += `<h4><b>${estudio.titulo}</b></h4>
                           <p>${estudio.periodo}</p>
                          `;
         tr.appendChild(td2);  
         tabla.appendChild(tr);
         });
}

function cargarTrabajos() {
   
      let trabajos = persona.informacion.trabajos;
      const tabla = document.querySelector('#lista-trabajos');
   
      trabajos.forEach(trabajos => {
            const tr = document.createElement('tr');
            tr.classList = 'text-center';
         
            const td1 = document.createElement('td');
            td1.innerHTML += `<img src=${trabajos.logo} alt="Avatar" style="width:50px">
                              <h6><b>${trabajos.lugar}</b></h6>`;
            tr.appendChild(td1);       
            const td2 = document.createElement('td');
            td2.innerHTML += `<h4><b>${trabajos.puesto}</b></h4>
                              <p>${trabajos.periodo}</p>
                             `;
            tr.appendChild(td2);  
            tabla.appendChild(tr);
            });
   }




function cargarHabilidades() {
   let habilidades = persona.informacion.habilidades;
   const tablaHab = document.querySelector('#lista-habilidades');

   habilidades.forEach(habilidad => {
         const tr = document.createElement('tr');
         tr.classList = 'text-center';   
         const td1 = document.createElement('td');
         td1.innerHTML += `<h6><b>${habilidad.area}</b></h6>`;
         tr.appendChild(td1);       
         const td2 = document.createElement('td');
         td2.innerHTML += `<h4><b>%${habilidad.porcentaje}</b></h4>`;
         tr.appendChild(td2);        
         tablaHab.appendChild(tr);
         });

   };


function cargarProyectos() {
      let proyectos = persona.informacion.proyectos;
      const tabla = document.querySelector('#lista-proyectos');
   
      proyectos.forEach(proyecto => {
            const tr = document.createElement('tr');
            tr.classList = 'text-center';   
            const td1 = document.createElement('td');
            td1.innerHTML += `<h4><b>${proyecto.rol}</b></h4>
                              <h6><b>${proyecto.periodo}</b></h6>`;
            tr.appendChild(td1);       
            const td2 = document.createElement('td');
            td2.innerHTML += `<h6><b>${proyecto.descripcion}</b></h6>`;
            tr.appendChild(td2);        
            tabla.appendChild(tr);
            });
   
};
// al cargarse la pagina completamos los tag con la info de la persona          
$(document).ready(function(){
   cargarinformacionPersona().then(informacion =>{
      cargarDatosPersona().then(persona => {
         persona.informacion = informacion;
         document.getElementById("ImagenPersona").src = persona.picture.large;
         document.getElementById("name").innerHTML += "   " + persona.name.first + ", " + persona.name.last;
         document.getElementById("direccion").innerHTML += "   " + persona.location.street.name + ", nro: " 
         + persona.location.street.number;
         document.getElementById("zona").innerHTML += "   " +  persona.location.city + ", " + persona.location.state + ", " 
         + persona.location.postcode + ", " +persona.location.country;
         document.getElementById("telefono").innerHTML += "   " + persona.phone;
         document.getElementById("email").innerHTML +=  "   " +  persona.email;
         cargarEstudios();
         cargarHabilidades();
         cargarTrabajos();
         cargarProyectos();

      });
   })
 });
