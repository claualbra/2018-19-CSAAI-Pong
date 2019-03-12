function main(){
  console.log("Pong: Main: Start!")

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");
  //-- Raquetas
  ctx.fillStyle = 'white';
  ctx.fillRect(50,180, 10, 40)
  ctx.fillRect(500,180, 10, 40)
  //linea del centro
  ctx.setLineDash([7, 10]);
  ctx.moveTo(300, 0);
  ctx.lineTo(300, 400);
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'white';
  ctx.stroke();
  //-- Texto solido
  ctx.font = "80px Arial";
  ctx.fillStyle = 'white'
  ctx.fillText("0", 220, 70);
  ctx.font = "80px Arial";
  ctx.fillStyle = 'white'
  ctx.fillText("0", 340, 70);
  //-- Definir el objeto BOLA
  var bola = {
    //-- Posición inicial de la pelota
    x_ini: 61,
    y_ini: 195,
    //-- Dimensiones de la Bola
    width: 5,
    height: 5,
    //-- Coornenadas
    x : 0,
    y : 0,
    //-- Velocidad
    vx : 4,
    vy : 1,
    //-- Contexto
    ctx: null,
    //-- Inicializar la bola
    init: function(ctx) {
      this.ctx = ctx;
      this.reset();
    },
    //-- Dibujar
    draw: function () {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x, this.y, this.width, this.height)
    },
    //-- Update
    update: function () {
      this.x += this.vx;
      this.y += this.vy;
    },
    //-- Reset: Set the ball to the initial state
    reset: function() {
      this.x = this.x_ini;
      this.y = this.y_ini;
    }
  }
  var raqueta = {
    //-- Posición inicial de la pelota
    x_ini: 50,
    y_ini: 180,
    //-- Dimensiones de la Bola
    width: 10,
    height: 40,
    //-- Coornenadas
    x : 0,
    y : 0,
    //-- Velocidad
    vx : 0,
    vy : 0,
    //-- Contexto
    ctx: null,
    //-- Inicializar la bola
    init: function(ctx) {
      this.ctx = ctx;
      this.reset();
    },
    //-- Dibujar
    draw: function () {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x, this.y, this.width, this.height)
    },
    //-- Update
    update: function () {
      console.log(this.y);
      this.x += this.vx;
      this.y = this.vy;
    },
    //-- Reset: Set the ball to the initial state
    reset: function() {
      this.x = this.x_ini;
      this.y = this.y_ini;
    }
  }
  //-- Inicializar y pintar la bola
  raqueta.init(ctx)
  raqueta.draw()
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
        raqueta.update()
        //-- Actualizar la bola
        bola.update();
        //-- Borrar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        raqueta.draw()
        //-- Dibuar la bola
        bola.draw();
        //-- Si la bola llega a la parte derecha del canvas:
        //-- Terminar
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
          //bola.update();
          //bola.draw();
        }
        window.onkeydown = (e) => {
          e.preventDefault();
          console.log(e.key);
          switch (e.key) {
            case 'w':
              raqueta.vy = 5
              raqueta.update()
              console.log('hola');
              break;
            case 's':
              raqueta.vy = -5
              raqueta.update()
              break;
            default:
              break;
          }
       }
      },20); //-- timer
    }
  } //-- Fin onclick
}
