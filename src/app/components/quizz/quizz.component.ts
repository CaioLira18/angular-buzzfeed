import { Component, OnInit } from '@angular/core';
import quizz__questions from "../../../assets/data/quizz_quetion.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title:string = ""

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string= ""

  questionIndex:number = 0
  questionMaxIndex:number= 0

  finished:boolean = false


  constructor() { }

  ngOnInit(): void {
    if(quizz__questions){
      this.finished = false
      this.title = quizz__questions.title

      this.questions = quizz__questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex += 1
    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz__questions.results[finalAnswer as keyof typeof quizz__questions.results]
    }
  }

  async checkResult(anwers:string[]){
    const result = anwers.reduce((previous, current, i, arr) =>{
        if(
          arr.filter(item => item === previous).length > 
          arr.filter(item => item === current).length 

        ){
          return previous
        }else{
          return current
        }
    })
    return result

  }
}

