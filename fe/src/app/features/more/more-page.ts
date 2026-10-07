import { Component, isDevMode } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/ui/icon';
import { BackupExport } from '../../shared/ui/backup-export';

@Component({
  selector: 'app-more-page',
  imports: [RouterLink, Icon, BackupExport],
  templateUrl: './more-page.html',
  styleUrl: './more-page.css',
})
export class MorePage {
  readonly showDocsPreview = isDevMode();
}
