import { Component } from '@angular/core';

@Component({
  selector: 'app-interview',
  imports: [],
  templateUrl: './interview.component.html',
  styleUrl: './interview.component.css'
})
export class InterviewComponent {
  question = '';
  answer = '';
  result: any = null;

  async submitAnswer() {
    const response = await axios.post('http://localhost:3000/analyze', {
      question: this.question,
      answer: this.answer
    });
    this.result = response.data;
  }
}
