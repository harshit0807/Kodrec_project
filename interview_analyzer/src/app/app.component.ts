import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styles: [`
    .container {
      max-width: 500px;
      margin: 60px auto;
      padding: 30px;
      background-color: #fff;
      border-radius: 12px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      font-family: 'Segoe UI', sans-serif;
    }

    h1, h2 {
      text-align: center;
      color: #333;
    }

    label {
      display: block;
      margin-top: 20px;
      font-weight: 600;
    }

    input, textarea {
      width: 100%;
      padding: 10px;
      border-radius: 6px;
      border: 1px solid #ccc;
      margin-top: 8px;
      box-sizing: border-box;
      font-size: 14px;
    }

    textarea {
      resize: vertical;
      height: 100px;
    }

    button {
      margin-top: 20px;
      width: 100%;
      padding: 12px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    button:hover {
      background-color: #0056b3;
    }

    .result {
      margin-top: 30px;
      padding: 20px;
      background-color: #f9f9f9;
      border-left: 4px solid #007bff;
      border-radius: 8px;
    }
  `]
})
export class AppComponent {
  question = '';
  answer = '';
  result: any;

  constructor(private http: HttpClient) {}

  analyzeAnswer() {
    this.http.post<any>('http://localhost:3000/api/analyze', {
      question: this.question,
      answer: this.answer
    }).subscribe(
      response => {
        console.log('Result:', response);
        this.result = response;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}
