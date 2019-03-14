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
  this.x_ini = 61,
  this.y_ini = 195,
  //-- Dimensiones de la Bola
  this.width = 5,
  this.height = 5,
  //-- Coornenadas
  this.x = 0,
  this.y = 0,
  //-- Velocidad
  this.vx = 4,
  this.vy = 1,
  //-- Contexto
  this.ctx = null,
  //-- Inicializar la bola
  this.init = function(ctx) {
    this.ctx = ctx;
    this.reset();
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
  this.reset = function() {
    this.x = this.x_ini;
    this.y = this.y_ini;
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
  player1.init(ctx)
  player2.init(ctx)
  player1.draw();
  player2.draw();
  bola.init(ctx)
  bola.draw()
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
        //-- Borrar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //-- Dibuar la bola y raquetas
        bola.draw();
        player1.draw();
        player2.draw();
        //-- Si la bola llega a la parte derecha del canvas:
        //-- Rebotar
        if (bola.x > canvas.width || bola.x < 0) {
          bola.vx = -bola.vx
          //-- Eliminar el timer
          //clearInterval(timer)
          //timer = null;
          //bola.update();
          //-- Bola a su posicion inicial
          //bola.reset();
          //-- Dibujar la bola en pos. inicial
          //bola.draw();
        };
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
          console.log(e.key);
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
