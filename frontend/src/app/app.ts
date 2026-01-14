import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastContainer } from './components/shared/toast-container/toast-container';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastContainer, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
