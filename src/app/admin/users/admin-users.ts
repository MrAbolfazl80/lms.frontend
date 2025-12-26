import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AgGridModule } from 'ag-grid-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalService, NzModalModule } from 'ng-zorro-antd/modal';
import { UsersServices } from "../../services/users.services";
import { CellRendererDeferParams, ColDef, ICellRendererParams } from "ag-grid-community";
import { User } from "../../models/users/user-model";
import { NzMessageService } from "ng-zorro-antd/message";
@Component({
    standalone: true,
    imports: [CommonModule, AgGridModule, NzButtonModule, NzModalModule],
    templateUrl: './admin-users.html',
    styleUrl: './admin-users.less'
})
export class AdminUsersComponent {
    constructor(private userService: UsersServices, private message: NzMessageService) { }
    userName: string = '';
    role: string = '';
    pageSize: number = 10;
    gridApi: any;
    columnDefs: ColDef<User>[] = [
        {
            headerName: 'نقش',
            sortable: false,
            field: 'role'
        },
        {
            headerName: 'نام کاربری',
            sortable: false,
            field: 'userName'
        },
        {
            headerName: 'شناسه',
            sortable: false,
            field: 'id'
        },
    ]
    onGridReady(params: any) {
        this.gridApi = params.api;
        const dataSource = {
            getRows: (gridParams: any) => {
                const page = Math.floor(gridParams.startRow / this.pageSize) + 1;

                this.userService.getAllUsers(this.userName, this.role, page, this.pageSize).subscribe({
                    next: (res) => {
                        if (res.success) {
                            gridParams.successCallback(res.data.items, res.data.totalCount);
                        } else {
                            gridParams.failCallback();
                            this.message.error('خطا در دریافت داده‌ها');
                        }
                    },
                    error: () => gridParams.failCallback()
                });
            }
        };

        params.api.setGridOption('datasource', dataSource);
        params.api.sizeColumnsToFit();
    }
}