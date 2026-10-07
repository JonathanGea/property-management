import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/ui/icon';

@Component({
  selector: 'app-more-page',
  imports: [RouterLink, Icon],
  templateUrl: './more-page.html',
  styleUrl: './more-page.css',
})
export class MorePage {}
