import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { IBidding } from '../../../models/IBidding.model';
import { trackById } from '../../../utils/track-by';

@Component({
  selector: 'app-biddings-list',
  templateUrl: './biddings-list.component.html',
  styleUrls: ['./biddings-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BiddingsListComponent implements OnInit, OnChanges {
  @Input() biddings: IBidding[];
  @Input() showHistory: boolean;
  trackById = trackById;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.biddings = changes.biddings.currentValue || changes.biddings.previousValue;
  }
}
