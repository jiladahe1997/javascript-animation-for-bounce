var avatar = document.getElementById("avatar");
var fall_count = 1 ;
var fall_b_pram = null ;
var frame_skip_counter = 21;
//var start_time = performance.now();
//此处有个问题，requestAnimation函数的time参数和performance的起始值并不一样
var start_time = null;

requestAnimationFrame(function avatar_anime(time){
    /*if( frame_skip_counter++ < 20) {
        requestAnimationFrame(avatar_anime);
        return;
    }*/
    if(!start_time) start_time=time;

    let duration_total = 3000;                  //动画预计持续总时间
    let duration_now = time - start_time ;      //动画目前持续时间
    
    //调试
    /*console.log("start_time:",start_time);  
    console.log("time:",time);
    console.log("duration_now:",duration_now);
    console.log("duration_total:",duration_total);
    */

    let progess_time = duration_now/duration_total;  //时间进度
    let progess_anime = function(){                  //动画进度，动画进度和时间进度不对应，以此来实现动画的快慢控制
        let g_pram = 10; //重力参数
        let z_pram = 0.3 ;//弹力参数
        console.log("fall_count%2",fall_count%2)
        if(fall_count == 1 ){
            console.log("掉落计数",fall_count);
            console.log("调试",g_pram*Math.pow(progess_time,2 )>=1);
            if( g_pram*Math.pow(progess_time,2) >= 1) fall_count++;
            return g_pram*Math.pow(progess_time,2);
        }
        else{
            console.log("上升计数",fall_count);
            if(!fall_b_pram) fall_b_pram = Math.sqrt(1/g_pram,2)+Math.sqrt(z_pram/g_pram,2);
            console.log("第二次正确B值",Math.sqrt(1/g_pram,2)+Math.sqrt(z_pram/g_pram,2));
            console.log("第三次正确B值",Math.sqrt(1/g_pram,2)+Math.sqrt(z_pram/g_pram,2)+Math.sqrt(Math.pow(z_pram,2)/g_pram,2)+Math.sqrt(Math.pow(z_pram,1)/g_pram,2))
            console.log("第四次正确B值",Math.sqrt(1/g_pram,2)+Math.sqrt(z_pram/g_pram,2)+Math.sqrt(Math.pow(z_pram,2)/g_pram,2)+Math.sqrt(Math.pow(z_pram,1)/g_pram,2)+Math.sqrt(Math.pow(z_pram,3)/g_pram,2)+Math.sqrt(Math.pow(z_pram,2)/g_pram,2))

            console.log("b",fall_b_pram);
            if( g_pram*Math.pow(progess_time-fall_b_pram,2) + 1 - Math.pow(z_pram,fall_count-1) >= 1 ) {
                frame_skip_counter = 0;
                fall_count++;
                fall_b_pram = fall_b_pram+Math.sqrt(Math.pow(z_pram,fall_count-2)/g_pram,2) + Math.sqrt(Math.pow(z_pram,fall_count-1)/g_pram,2);
            }
            return g_pram*Math.pow(progess_time-fall_b_pram,2) + 1 - Math.pow(z_pram,fall_count-1);
        }
    }();

    console.log("progess_anime",progess_anime)
    avatar.style.top = 200*progess_anime + "px";
    //调试
    console.log("avatar.style.top:",avatar.style.top);

    if(duration_now < duration_total - 100){
        requestAnimationFrame(avatar_anime);
    }
    else{
    	//avatar.style.top = 200 + "px";
        console.log("动画结束！");
    }
})