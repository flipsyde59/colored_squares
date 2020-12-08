let all_squares = document.getElementsByClassName("square-cell");
let square = document.querySelector(".square");
let timer = document.querySelector(".timer");
let restart = document.querySelector(".restart");
let bot = document.querySelector(".bot");
let level = document.querySelector(".cur-level");

let cur_time_s = Number(localStorage.getItem('u_sec'))||30;
let timer_id = null;
let cur_level = Number(localStorage.getItem('u_level'))||1;

load_page = function () {
  level.textContent = "Уровень: " + cur_level;
  timer.textContent = "Осталось: " + cur_time_s + " сек";
  new_level();
  timer_id = setInterval(() => {
    cur_time_s--;
	localStorage.setItem('u_sec', cur_time_s);
    timer.textContent = "Осталось: " + cur_time_s + " сек"
    if (cur_time_s < 1) {
      game_over();
    }
  }, 1000);
  restart.onclick = function () {
	restarting();
  }
  bot.onclick = function () {
    find_unique_square();
  }
}

window.onload = load_page;

random = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

random_color = function () {
  let red = random(100, 255);
  let green = random(100, 255);
  let blue = random(100, 255);
  return [red, green, blue]
}

new_level = function () {
  let square_count = (cur_level+1)*(cur_level+1);
  let tmp_sq = square.childElementCount;
  for (var i = 0; i < tmp_sq; i++)
  	square.removeChild(square.firstElementChild);
  
  let r_c = random_color();
  let r_s = random(1, square_count);
  let difference = 150 / cur_level;
  for (var i = 0; i < square_count; i++) {
    var cur_square = document.createElement("div");
    cur_square.className = "square-cell";
    var square_size = 500 / (cur_level+1) - 6;
    cur_square.style.width = `${square_size}px`;
    cur_square.style.height = `${square_size}px`;
    if (i != r_s - 1) {
      cur_square.style.backgroundColor = `rgb( ${r_c[0]}, ${r_c[1]}, ${r_c[2]})`;
      cur_square.onclick = game_over;
    }
    else {
      cur_square.style.backgroundColor = `rgb( ${r_c[0] - difference}, ${r_c[1] - difference}, ${r_c[2] - difference})`;
      cur_square.onclick = continue_Game;
    }
    square.append(cur_square);
  }
}

continue_Game = function () {
  cur_level++;
  new_level();
  level.textContent = "Уровень: " + cur_level;
  localStorage.setItem('u_level', cur_level);
}

game_over = function () {
  level.textContent = "Максимальный уровень: " + cur_level;
  clearInterval(timer_id);
  timer.style.display = "none";
  bot.style.display = "none";
  restart.style.display = "block";
  localStorage.removeItem('u_level');
  localStorage.removeItem('u_sec');
  localStorage.setItem('u_level', 1);
  localStorage.setItem('u_sec', 30);
  for (j = 0; j < all_squares.length; j++)
    all_squares[j].onclick = function () { }
}

find_unique_square = function () {
  let cur_color;
  if (all_squares[0].style.backgroundColor == all_squares[1].style.backgroundColor) {
    cur_color = all_squares[0].style.backgroundColor;
  }
  else {
    if (all_squares[0].style.backgroundColor == all_squares[2].style.backgroundColor) {
      all_squares[1].onclick();
      return
    }
    else {
      all_squares[0].onclick();
      return
    }
  }
  for (i = 0; i < all_squares.length; i++) {
    if (all_squares[i].style.backgroundColor != cur_color) {
      all_squares[i].onclick();
      return
    }
  }
}

restarting = function(){
	cur_time_s = 30;
	timer_id = null;
    cur_level = 1;
	restart.style.display="none";
	timer.style.display = "block";
    bot.style.display = "block";
	level.textContent = "УРОВЕНЬ: " + cur_level;
	load_page();
}
