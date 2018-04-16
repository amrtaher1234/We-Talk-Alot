//Collision detection and resolution
//move the mouse, the sprite responds to overlapings, collision, 
//and displaces another sprite
var movabletank;
var maze_text; 
var blocks_array; 
function setup()
{
  blocks_array= new Group();
  createCanvas(windowWidth,windowHeight);
  var scale=3.2,stepwidth=1,stephight=1,blocksize=16;  
  maze_text = readTextFile("output.txt");
  drawmaze(maze_text,scale,stepwidth,stephight,0);
  movabletank=new movs(scale,stephight,stepwidth,blocksize);
  //movabletank.tank.attractBoolean = 1;
  console.log("width="+width + "\nheight=" +height +"\nblock size=" + blocksize); 
}

function draw() 
{
  clear();
  fill(120,2,2); 
 
  background(25,255,255);
  //movabletank.move();
  drawSprites();



 if (movabletank.pos_marker <= movabletank.v_step_list.length -1 )
 {
   
    if (movabletank.pos_marker<movabletank.v_step_list.length)
    {
    movabletank.tank.moveToPoint(movabletank.v_step_list[movabletank.pos_marker].x ,movabletank.v_step_list[movabletank.pos_marker].y );
    console.log(movabletank.tank.Body.position.x , movabletank.tank.Body.position.y); 
    }
  if (movabletank.tank.reachedPoint(movabletank.v_step_list[movabletank.pos_marker].x ,movabletank.v_step_list[movabletank.pos_marker].y))
  {
   //movabletank.tank.setTankFriction(1); 
   movabletank.pos_marker++;  
  }
  var endlist = movabletank.v_step_list.length-1; 
  if (movabletank.tank.reachedPoint(movabletank.v_step_list[endlist].x , movabletank.v_step_list[endlist].y))
  {
   movabletank.tank.setTankFriction(1);  
   movabletank.tank.Body.position = movabletank.v_step_list[endlist]; 
   console.log( "this is just the final "  ,movabletank.tank.Body.position.x , movabletank.tank.Body.position.y); 
   

  }
 }
  if (movabletank.tank.Body.overlap(blocks_array))
  {
    text("Game is over", width/2, height/2, 20, 20); 
    // Game over logic  should be encapsulated here.
     
  }
 if (mouseIsPressed)
 {
   for (i =0; i<5; i++)
{
movabletank.movdown(); 
}
for (var i =0; i<20 ; i++)
{
var temp = random(0, 100); 
if (temp<30)
{
  movabletank.movdown(); 
}
if (temp>60)
{
  movabletank.movright(); 
}
}
 }

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
     this.blockssprite = createSprite(this.xpos , this.ypos );
     this.blockssprite.addImage(loadImage("assets/hollow middle.png"));
     this.blockssprite.scale=this.blockscale*.125;
     console.log( "BLOOOOOOOOOOOCK WIDTH" , this.blockssprite.height); 
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
    this.tank.setTotalScale(0.44); 
    this.tank.setTankFriction(0.001); 
    //this.tank.setTotalScale(0.58); 

    this.v_step_horizontal = createVector(this.stepwidth, 0);
    this.v_step_vertical   = createVector(0,this.stephight);
    this.v_temp            = createVector(this.initx,this.inity);
    this.v_step_list=[];
    this.pos_marker =0; 
  }
  //function 
  movup()
  { 
    this.v_temp.sub(this.v_step_vertical);
    this.v_step_list.push(createVector(this.v_temp.x , this.v_temp.y));
    movabletank.tank.setTankFriction(0); 
    
  }
  //function 
  movdown()
  {
    this.v_temp.add(this.v_step_vertical);
    this.v_step_list.push(createVector(this.v_temp.x , this.v_temp.y));
    movabletank.tank.setTankFriction(0); 
    
  }
  // function 
  movright()
  {
    this.v_temp.add(this.v_step_horizontal);
    this.v_step_list.push(createVector(this.v_temp.x , this.v_temp.y)); 
    movabletank.tank.setTankFriction(0); 
    
  }
  //function 4
  movleft ()
  {
    this.v_temp.sub(this.v_step_horizontal);
    this.v_step_list.push(createVector(this.v_temp.x , this.v_temp.y)); 
    movabletank.tank.setTankFriction(0);     
    
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
function drawmaze(maze,scale,stepwidth,stephight,mazenumber)
{ 
  blocksize=scale*16;
  var xpos=blocksize/2,ypos=blocksize/2;
  var brick,currnt_element;
  var rownumber=mazenumber*11;
  var row_end=rownumber+10;
  //row loop
  for(var row=rownumber;row<row_end;row++)
  {
    //colomn loop 
    for(var colomn=0;colomn<12;colomn++)
    {
      //charecter for this row in the array
      currnt_element = findelement(maze,12,row,colomn);
      var currentX=xpos,currentY=ypos;
        
      
        // start block is special XD , so is the end block
      if (row==rownumber && colomn==0|| row==row_end-1 && colomn==9)
      {
        //loop on said block's rows and colomns and add them 
        for(var inblock_row=0;inblock_row<stephight;inblock_row++)
        {
          xpos=currentX; // 1st 16  .. 
          for(var inblock_colomn=0;inblock_colomn<stepwidth;inblock_colomn++)
          {
           Markbrick=new StartEnd(xpos,ypos,scale);
           Markbrick.drawbrick();
           xpos+=blocksize;
          }  

          if (inblock_row +1>= stephight)
          {
            continue; 
          }
          ypos+=blocksize;
          
        }
        ypos=currentY;
      }

    else if (currnt_element=='#')
      {
        //loop on said block's rows and colomns and add them 
        for(var inblock_row=0;inblock_row<stephight;inblock_row++)
        {
          xpos=currentX;
          for(var inblock_colomn=0;inblock_colomn<stepwidth;inblock_colomn++)
          {
           brick=new Brick(xpos,ypos,scale);
           brick.drawbrick();
           blocks_array.add(brick.blockssprite); 
           xpos+=blocksize;
          }  
          if(inblock_row +1 >= stephight)
          {
            console.log("testing inblock continue"); 
            continue; 
          }
          ypos+=blocksize;
          
        }
      ypos=currentY;
      
      }
      
      else if (currnt_element=='.')
      {
        for(var inblock_row=0;inblock_row<stephight;inblock_row++)
        {
          xpos=currentX;
          for(var inblock_colomn=0;inblock_colomn<stepwidth;inblock_colomn++)
          {
            path=new Path(xpos,ypos,scale);
            path.drawbrick();
            xpos+=blocksize;
          }  
          if (inblock_row + 1 >= stephight)
          {
            console.log("testing inblock continue 2"); 
            continue; 
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
    ypos+=blocksize*(stephight);
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
                 //alert(allText);
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
class Code {
    constructor()
    {
        this.code = ""; 

    }
    evaluate()
    {
        try
        {
        eval(this.code); 
        }
        catch{
            console.log("error in code written");
        }
        this.code=""; 
    }
    addCode(str)
    {
        this.code+=str; 
    }
}