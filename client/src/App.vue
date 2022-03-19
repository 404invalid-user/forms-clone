<template>
  <router-view />
</template>

<style>
html,
body {
  font-family: "Open Sans", sans-serif;
  background-color: #f0ebf8;
  margin: 0;
  padding: 0;
}

.breaker {
  width: 97%;
  height: 0.7px;
  background-color: #d3d3d3;
}
.buttons {
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
}
.button {
  background: #42b883;
  border: none;
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  color: white;
  padding: 3px 10px;
  justify-content: center;
  text-decoration: none;
}
.button:hover {
  background: #41ad7d;
  text-decoration: none;
}
.edit {
  display: flex;
  flex-direction: row;
  gap: 5px;
}
.title {
  font-size: 32px;
}
.description {
  margin-top: 12px;
}
@media screen and (max-width: 560px) {
  .title {
    font-size: 24px;
  }
}
.question-wrap {
  width: 80%;
  background: white;
  border-radius: 6px;
  padding: 24px;
  margin-bottom: 12px;
  border: 1px solid #dadce0;
}
.question-title {
  margin: 0;
  margin-bottom: 16px;
  font-size: 16px;
  letter-spacing: 0.1px;
  line-height: 24px;
  color: #202124;
  font-weight: 400;
  word-break: break-word;
}

.question-input {
  border: none;
  background-color: transparent;
  resize: none;
  outline: none;
  font-size: 14px;
  line-height: 20px;
  border-bottom: 1px solid rgb(0, 0, 0, 0.12);
  color: black;
  padding-bottom: 8px;
  width: 40%;
}
* {
  box-sizing: border-box;
  user-select: none;
}

input[type="checkbox"] {
  height: 0;
  width: 0;
}

input[type="checkbox"] + label {
  position: relative;
  display: flex;
  margin: 0.6em 0;
  align-items: center;
  transition: color 250ms cubic-bezier(0.4, 0, 0.23, 1);
}
input[type="checkbox"] + label > span {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1em;
  width: 1em;
  width: 20px;
  height: 20px;
  background: transparent;
  border: 2px solid #9e9e9e;
  border-radius: 2px;
  cursor: pointer;
  transition: all 250ms cubic-bezier(0.4, 0, 0.23, 1);
}

input[type="checkbox"]:checked + label > span {
  border: 0.6em solid #673ab7;
  animation: shrink-bounce 200ms cubic-bezier(0.4, 0, 0.23, 1);
}
input[type="checkbox"]:checked + label > span:before {
  content: "";
  position: absolute;
  top: 0.5em;
  left: 0.2em;
  color: white;
  border-right: 3px solid transparent;
  border-bottom: 3px solid transparent;
  transform: rotate(45deg);
  transform-origin: 0% 100%;
  animation: checkbox-check 125ms 250ms cubic-bezier(0.4, 0, 0.23, 1) forwards;
}

@keyframes shrink-bounce {
  0% {
    transform: scale(1);
  }
  33% {
    transform: scale(0.85);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes checkbox-check {
  0% {
    width: 0;
    height: 0;
    border-color: white;
    transform: translate3d(0, 0, 0) rotate(45deg);
  }
  33% {
    width: 0.2em;
    height: 0;
    transform: translate3d(0, 0, 0) rotate(45deg);
  }
  100% {
    width: 0.2em;
    height: 0.5em;
    border-color: white;
    transform: translate3d(0, -0.5em, 0) rotate(45deg);
  }
}
.author {
  display: flex;
  gap: 4px;
  align-items: center;
}

.author img {
  height: 23px;
  border-radius: 100%;
}

.author .discriminator {
  color: #333;
}
</style>
