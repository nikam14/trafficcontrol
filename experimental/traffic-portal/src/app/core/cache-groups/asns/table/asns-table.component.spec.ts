/*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { RouterTestingModule } from "@angular/router/testing";

import { APITestingModule } from "src/app/api/testing";
import { AsnsTableComponent } from "src/app/core/cache-groups/asns/table/asns-table.component";

describe("CacheGroupTableComponent", () => {
	let component: AsnsTableComponent;
	let fixture: ComponentFixture<AsnsTableComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ AsnsTableComponent ],
			imports: [ APITestingModule, RouterTestingModule, MatDialogModule ]
		})
			.compileComponents();

		fixture = TestBed.createComponent(AsnsTableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("updates the fuzzy search output", fakeAsync(() => {
		let called = false;
		const text = "testquest";
		const spy = jasmine.createSpy("subscriber", (txt: string): void =>{
			if (!called) {
				expect(txt).toBe("");
				called = true;
			} else {
				expect(txt).toBe(text);
			}
		});
		component.fuzzySubject.subscribe(spy);
		tick();
		expect(spy).toHaveBeenCalled();
		component.fuzzControl.setValue(text);
		component.updateURL();
		tick();
		expect(spy).toHaveBeenCalledTimes(2);
	}));

	it("handles contextmenu events", () => {
		expect(async () => component.handleContextMenu({
			action: component.contextMenuItems[0].name,
			data: {asn: 0, cachegroup: "mb", cachegroupId: 1, id: 1, lastUpdated: new Date()}
		})).not.toThrow();
	});
});
