//Collision detection and resolution
//move the mouse, the sprite responds to overlapings, collision, 
//and displaces another sprite
var movabletank;
function setup()
{
  createCanvas(windowWidth,windowHeight);
  var maze_text,scale=2.25,stepwidth=3,stephight=2,blocksize=16;  
  maze_text = readTextFile("output.txt");
  drawmaze(maze_text,scale,stepwidth,stephight);
  movabletank=new movs(scale,stephight,stepwidth,blocksize);
  //movabletank.tank.attractBoolean = 1;
  console.log("width="+width + "\nheight=" +height +"\nblock size=" + blocksize); 
}

function draw() 
{
}
class StartEnd
{
  constructor(Xposition,Yposition,blockscale )
  {
    this.xpos=Xposition;
    this.ypos=Yposition;
    this.blockscale=blockscale;
    this.blockssprite=null; 
  }
  drawbrick()
  {
    this.blockssprite = createSprite(this.xpos , this.ypos);
    this.blockssprite.addImage(loadImage("assets/block.png"));
    this.blockssprite.scale=this.blockscale*.2;
  }
}
class Brick
{
  constructor(Xposition,Yposition,blockscale )
  {
    this.xpos=Xposition;
    this.ypos=Yposition;
    this.blockscale=blockscale;
    this.blockssprite=null; 
  }
  drawbrick()
  {
    this.blockssprite = createSprite(this.xpos , this.ypos);
    this.blockssprite.addImage(loadImage("assets/blocks.png"));
    this.blockssprite.scale=this.blockscale;
  }
}
class Path
{
  constructor(Xposition,Yposition,blockscale )
  {
     this.xpos=Xposition;
     this.ypos=Yposition;
     this.blockscale=blockscale;
     this.blockssprite=null; 
  }
  drawbrick()
  {
     this.blockssprite = createSprite(this.xpos , this.ypos);
     this.blockssprite.addImage(loadImage("assets/hollow middle.png"));
     this.blockssprite.scale=this.blockscale*.125;
  }
}

class movs
{ 
  /***
   * @param {*} scale     picture scale 
   * @param {*} stephight number of vertical tiles in each step 
   * @param {*} stepwidth number of horizontal tiles in each step
   * @param {*} blocksize size or hight of a single tile (in pixels) 
   */
  constructor(scale,stephight,stepwidth,blocksize)
  {
    this.stephight=blocksize*scale*stephight;
    this.stepwidth=blocksize*scale*stepwidth;
    this.initx=this.stepwidth/2;
    this.inity=this.stephight/2;
    this.tank=new VisualTank(this.initx,this.inity,"assets/tankbody.png","assets/canon.png");
    this.tank.setTankFriction(0.001); 
    this.y=this.inity;
    this.x-this.initx;
    var v_step_horizontal = createVector(this.stepwidth, 0);
    var v_step_vertical   = createVector(0,this.stephight);
    var v_temp            = createVector(this.initx,this.inity);
    this.v_step_list=[];
  }
  //function 
  movup()
  { 
    this.v_temp.sub(this.v_step_vertical);
    this.v_step_list.push(this.v_temp);
  }
  //function 
  movdown()
  {
    this.v_temp.add(this.v_step_vertical);
    this.v_step_list.push(this.v_temp);
  }
  // function 
  movright()
  {
    this.v_temp.add(this.v_step_horizontal);
    this.v_step_list.push(this.v_temp); 
  }
  //function 4
  movleft ()
  {
    this.v_temp.sub(this.v_step_horizontal);
    this.v_step_list.push(this.v_temp); 
  }
  
/*  move()
 {
    if(this.b_moveup)
     this.movup();
    else if (this.b_movedown)
      this.movdown();
    else if (this.b_moveleft)
      this.movleft();
    else if (this.b_moveright)
      this.movright();
 }*/
  
}

///_________________________________________________
//maze     : 1d with the maze charecters 
//scale    : block sprite scale factor
//stepwidth:number of horizontal blocks that still count as one step in the array(rows)
//stephight:number of horizontal blocks that still count as one step in the array(colomns)
//a step is a bunch of block 
//block size is the size of each section of those little blocks 
///_________________________________________________
function drawmaze(maze,scale,stephight,stepwidth)
{ 
  blocksize=scale*15;
  var xpos=blocksize/2,ypos=blocksize/2;
  var brick,currnt_element;
  //row loop
  for(var row=0;row<10;row++)
  {
    //colomn loop 
    for(var colomn=0;colomn<11;colomn++)
    {
      //charecter for this row in the array
      currnt_element = findelement(maze,11,row,colomn);
      var currentX=xpos,currentY=ypos;
        
      
        // start block is special XD , so is the end block
      if (row==0 && colomn==0|| row==9 && colomn==9)
      {
        //loop on said block's rows and colomns and add them 
        for(var inblock_row=0;inblock_row<stepwidth;inblock_row++)
        {
          xpos=currentX;
          for(var inblock_colomn=0;inblock_colomn<stephight;inblock_colomn++)
          {
           Markbrick=new StartEnd(xpos,ypos,scale);
           Markbrick.drawbrick();
           xpos+=blocksize;
          }  
          ypos+=blocksize;
          
        }
        ypos=currentY;
      }

      else if (currnt_element=='#')
      {
        //loop on said block's rows and colomns and add them 
        for(var inblock_row=0;inblock_row<stepwidth;inblock_row++)
        {
          xpos=currentX;
          for(var inblock_colomn=0;inblock_colomn<stephight;inblock_colomn++)
          {
           brick=new Brick(xpos,ypos,scale);
           brick.drawbrick();
           xpos+=blocksize;
          }  
          ypos+=blocksize;
          
        }
      ypos=currentY;
      
      }
      
      else if (currnt_element=='.')
      {
        for(var inblock_row=0;inblock_row<stepwidth;inblock_row++)
        {
          xpos=currentX;
          for(var inblock_colomn=0;inblock_colomn<stephight;inblock_colomn++)
          {
            path=new Path(xpos,ypos,scale);
            path.drawbrick();
            xpos+=blocksize;
          }  
          ypos+=blocksize;
          
        }
      ypos=currentY;
      
           
      }
      else 
      {
       console.log(currnt_element);
       continue;
      }
      console.log(currnt_element);
      //xpos+=blocksize/4;// remove this line to remove the spaces between each step 
    }
    xpos=blocksize/2;
    ypos+=blocksize*(stephight-1);
  }   
}

function findelement(_1d,num_O_colomns,row,colomn)
{
  return _1d[num_O_colomns*row+colomn];
}

function readTextFile(file)
{
     var rawFile = new XMLHttpRequest();
     var allText;
     rawFile.open("GET", file, false);
     rawFile.onreadystatechange = function ()
     {
         if(rawFile.readyState === 4)
         {
             if(rawFile.status === 200 || rawFile.status == 0)
             {
                 allText = rawFile.responseText;
                 alert(allText);
             }
         }
     }
     rawFile.send(null);
     return allText; 
}
/*
function fill2darray(_1d,_2d,rownum)
{
  for(var i=0;i<rownum;i++)
  {
    var colnum=0;
    for(var j=0;j<rownum;j++)
    {
      _2d[i][j]==_1d[rownum*colnum+j]
      colnum+=1;
    }
    colnum=0;
  }   

}

function drawmaze(maze)
{ 
  var xpos=0,ypos=0;
  var brick;
  for(var i=0;i<10;i++)
  {
    for(var j=0;j<10;j++)
    {
      if (maze[i][j]=='#')
      {
        brick=new Brick(xpos,ypos);
        brick.drawbrick();
      }

      xpos+=15;
    }
    xpos=0;
    ypos+=15;
  }   
}
*/