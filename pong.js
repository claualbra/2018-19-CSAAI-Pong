function raqueta(posx,posy){
  //-- Posición inicial de la pelota
  this.x_ini = posx;
  this.y_ini = posy;
  //-- Dimensiones de la Bola
  this.width = 10;
  this.height = 40;
  //-- Coornenadas
  this.x =  0;
  this.y = 0;
  //-- Velocidad
  this.vx = 0;
  this.vy = 0;
  //-- Contexto
  this.ctx = null;
  //-- Inicializar la bola
  this.init = function(ctx) {
    this.ctx = ctx;
    this.reset();
  };
  //-- Dibujar
  this.draw = function () {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
  };
  //-- Update
  this.update = function () {
    this.x += this.vx;
    this.y += this.vy;
  };
  //-- Reset: Set the ball to the initial state
  this.reset = function() {
    this.x = this.x_ini;
    this.y = this.y_ini;
  };
}
//-- Definir el objeto BOLA
function pelota(){
  //-- Posición inicial de la pelota
  this.x_ini1 = 61,
  this.y_ini1 = 195,
  this.x_ini2 = 492,
  this.y_ini2 = 195,
  //-- Dimensiones de la Bola
  this.width = 5,
  this.height = 5,
  //-- Coornenadas
  this.x = 0,
  this.y = 0,
  //-- Velocidad
  this.vx = 6,
  this.vy = 2,
  //-- Contexto
  this.ctx = null,
  //-- Inicializar la bola
  this.init = function(ctx) {
    this.ctx = ctx;
    this.reset1();
  },
  //-- Dibujar
  this.draw = function () {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
  },
  //-- Update
  this.update = function () {
    this.x += this.vx;
    this.y += this.vy;
  },
  //-- Reset: Set the ball to the initial state
  this.reset1 = function() {
    this.x = this.x_ini1;
    this.y = this.y_ini1;
  }
  this.reset2 = function() {
    this.x = this.x_ini2;
    this.y = this.y_ini2;
  }
}
function contador(){
  this.ctx = null,
  this.punt1 = 0;
  this.punt2 = 0;
  this.punt_init1 = 0;
  this.punt_init2 = 0;

  this.init = function(ctx) {
    this.ctx = ctx;
    this.reset();
  },
  this.draw = function () {
    this.ctx.font = "80px Arial";
    this.ctx.fillStyle = 'white'
    this.ctx.fillText(this.punt_init1, 220, 70);
    this.ctx.font = "80px Arial";
    this.ctx.fillStyle = 'white'
    this.ctx.fillText(this.punt_init2, 340, 70);
  },
  //-- Update
  this.update = function () {
    this.punt_init1 = this.punt1;
    this.punt_init2 = this.punt2;
  },
  //-- Reset: Set the ball to the initial state
  this.reset = function() {
    this.punt_init1 = 0;
    this.punt_init2 = 0;
  }
}
function main(){
  console.log("Pong: Main: Start!")

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

  var player1 = new raqueta(50,180);
  var player2 = new raqueta(500,180);
  var bola = new pelota();
  var puntos = new contador();
  player1.init(ctx)
  player2.init(ctx)
  player1.draw();
  player2.draw();
  bola.init(ctx)
  bola.draw()
  puntos.init(ctx);
  puntos.draw();
  //linea del centro
  ctx.setLineDash([7, 10]);
  ctx.moveTo(300, 0);
  ctx.lineTo(300, 400);
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'white';
  ctx.stroke();
  //-- Crear timer para la animación
  //-- Inicialmente a null
  var timer = null;
  //-- Boton de salcar
  var sacar = document.getElementById('sacar')
  //-- Función de retrollamda del botón de sacar.
  sacar.onclick = () => {
    //-- Si la bola ya se está animando,
    //-- no hacer nada
    if (!timer) {
      //-- Lanzar el timer. Su funcion de retrollamada la definimos
      //-- en su primer parámetro
      timer = setInterval(()=>{
        //-- Esto se ejecuta cada 20ms
        //actualizar jugadores
        player1.update()
        player2.update()
        //-- Actualizar la bola
        bola.update();
        puntos.update();
        //-- Borrar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //-- Dibuar la bola y raquetas
        bola.draw();
        player1.draw();
        player2.draw();
        puntos.draw();
        //linea del centro
        ctx.setLineDash([7, 10]);
        ctx.moveTo(300, 0);
        ctx.lineTo(300, 400);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';
        ctx.stroke();
        //-- Si la bola llega a la parte derecha del canvas:
        //-- Rebotar
        if (bola.x > canvas.width) {
          puntos.punt1 += 1;
          //-- Eliminar el timer
          clearInterval(timer)
          timer = null;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          //-- Bola a su posicion inicial
          //linea del centro
          ctx.setLineDash([7, 10]);
          ctx.moveTo(300, 0);
          ctx.lineTo(300, 400);
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'white';
          ctx.stroke();

          bola.reset2();
          player1.reset();
          player2.reset();
          puntos.update();
          //-- Dibujar la bola en pos. inicial
          bola.draw();
          player1.draw();
          player2.draw();
          puntos.draw();
        }
        if (bola.x < 0) {
          puntos.punt2 += 1;
          clearInterval(timer)
          timer = null;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          //-- Bola a su posicion inicial
          //linea del centro
          ctx.setLineDash([7, 10]);
          ctx.moveTo(300, 0);
          ctx.lineTo(300, 400);
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'white';
          ctx.stroke();

          bola.reset1();
          player1.reset();
          player2.reset();
          puntos.update();
          //-- Dibujar la bola en pos. inicial
          bola.draw();
          player1.draw();
          player2.draw();
          puntos.draw();
        }
        if (bola.y > canvas.height || bola.y < 0) {
          bola.vy = -bola.vy
        }
        if (bola.x < (player1.x + player1.width) && bola.y < (player1.y + player1.height) && bola.y > player1.y) {
          bola.vx = -bola.vx
        }
        if (bola.x > player2.x && bola.y < (player2.y + player2.height) && bola.y > player2.y) {
          bola.vx = -bola.vx
        }
        window.onkeydown = (e) => {
          e.preventDefault();
          switch (e.key) {
            case 'w':
              player1.vy = -5;
              break;
            case 's':
              player1.vy = 5;
              break;
            case 'ArrowUp':
              player2.vy = -5;
              break;
            case 'ArrowDown':
              player2.vy = 5;
              break;
            default:
              break;
          }
        }
        window.onkeyup = (e) => {
          switch (e.key) {
            case 'w':
              player1.vy = 0;
              break;
            case 's':
              player1.vy = 0;
              break;
            case 'ArrowUp':
              player2.vy = 0;
              break;
            case 'ArrowDown':
              player2.vy = 0;
              break;
            default:
              break;
          }
        }
      },20); //-- timer
    }
  } //-- Fin onclick
}
