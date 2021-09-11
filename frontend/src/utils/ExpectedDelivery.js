export function expectedDelivery(mode){
   if(mode==1){
       return Math.floor(Math.random()*10);
   }
   if(mode==2){
    return Math.floor(Math.random()*20);
}
if(mode==3){
    return Math.floor(Math.random()*4);
}
}