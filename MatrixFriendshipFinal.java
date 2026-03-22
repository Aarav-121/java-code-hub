import javax.swing.*;import java.awt.*;import java.awt.event.*;import java.awt.geom.Path2D;import java.util.Random;

public class MatrixFriendshipFinal extends JPanel implements Runnable{
int w=800,h=600,y[],l=0,c=0;Random r=new Random();float f=1,hs=1;boolean fd,sa,g=true;
JButton yb=new JButton("Yes ❤️"),nb=new JButton("No");
String[] m={"Hey elder one,","You might not realize it always,","but you mean a lot to me.",
"Your guidance and support mean a lot to me,","and i am truly grateful to have you in my life.",
"Thank you for being someone i can always look up to❤️"};long t=0;

public MatrixFriendshipFinal(){
setLayout(null);setBackground(Color.BLACK);
yb.setBounds(300,350,80,40);nb.setBounds(420,350,80,40);
add(yb);add(nb);
yb.addActionListener(e->{sa=true;yb.setVisible(false);nb.setVisible(false);});
nb.addMouseListener(new MouseAdapter(){public void mouseEntered(MouseEvent e){
nb.setLocation(r.nextInt(w-100),r.nextInt(h-100));}});
y=new int[w/10];for(int i=0;i<y.length;i++)y[i]=r.nextInt(h);
new Thread(this).start();
}

protected void paintComponent(Graphics g){
super.paintComponent(g);Graphics2D g2=(Graphics2D)g;
g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING,RenderingHints.VALUE_ANTIALIAS_ON);
if(!sa){g2.setColor(Color.WHITE);g2.setFont(new Font("Arial",1,26));
g2.drawString("Do you love me❤️?",w/2-260,200);}
else{
g2.setComposite(AlphaComposite.getInstance(3,f));
g2.setColor(Color.BLACK);g2.fillRect(0,0,w,h);
g2.setColor(Color.GREEN);g2.setFont(new Font("Monospaced",1,14));
for(int i=0;i<y.length;i++){g2.drawString(""+r.nextInt(10),i*10,y[i]);
y[i]+=10;if(y[i]>h)y[i]=0;}
g2.setComposite(AlphaComposite.getInstance(3,1));
if(f<.1){drawHeart(g2);drawText(g2);}
}
}

void drawHeart(Graphics2D g2){
int cx=w/2,cy=h/2-50;
hs+=g?.005:-.005;if(hs>1.1)g=false;if(hs<.95)g=true;
g2.translate(cx,cy);g2.scale(hs,hs);
g2.setColor(new Color(255,50,50,80));
for(int i=0;i<5;i++)g2.fill(h(100+i*5));
g2.setColor(Color.RED);g2.fill(h(100));
g2.scale(1/hs,1/hs);g2.translate(-cx,-cy);
}

Shape h(int s){
Path2D p=new Path2D.Double();p.moveTo(0,0);
p.curveTo(-s/2,-s/2,-s,s/3,0,s);
p.curveTo(s,s/3,s/2,-s/2,0,0);return p;
}

void drawText(Graphics2D g2){
g2.setColor(Color.WHITE);g2.setFont(new Font("Arial",1,20));
int sy=h/2+120;long n=System.currentTimeMillis();
if(n-t>60){t=n;if(l<m.length){if(c<m[l].length())c++;else{l++;c=0;}}}
for(int i=0;i<l;i++)g2.drawString(m[i],w/2-220,sy+i*30);
if(l<m.length)g2.drawString(m[l].substring(0,c),w/2-220,sy+l*30);
}

public void run(){
long s=System.currentTimeMillis();
while(true){
if(sa){
if(System.currentTimeMillis()-s>500)fd=true;
if(fd&&f>0){f-=.01;if(f<0)f=0;}
}
repaint();
try{Thread.sleep(40);}catch(Exception e){}
}
}

public static void main(String[] a){
JFrame f=new JFrame("Little Surprise ❤️");
f.add(new MatrixFriendshipFinal());
f.setSize(500,500);f.setDefaultCloseOperation(3);
f.setLocationRelativeTo(null);f.setVisible(true);
}
}