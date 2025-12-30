import type { AppOnetimeCharge, AppRecurringCharge, CreateOnetimeChargeRequest, CreateRecurringChargeRequest } from '../types';

export class BillingResource {
  constructor(private apiRequest: <T>(endpoint: string, options?: any) => Promise<T>) {}

  public async check(): Promise<AppRecurringCharge | null> {
    const charges = await this.list();
    const activeCharge = charges.find(
      (c): c is AppRecurringCharge => c.type === 'recurring' && c.status === 'active',
    );

    return activeCharge || null;
  }

  public async request(data: CreateOnetimeChargeRequest | CreateRecurringChargeRequest): Promise<AppOnetimeCharge | AppRecurringCharge> {
    if ('plans' in data) {
      return this.apiRequest<AppRecurringCharge>('/billing/apps/charges/recurring', {
        method: 'POST',
        body: data,
      });
    }

    return this.apiRequest<AppOnetimeCharge>('/billing/apps/charges/onetime', {
      method: 'POST',
      body: data,
    });
  }

  public async list(): Promise<(AppOnetimeCharge | AppRecurringCharge)[]> {
    return this.apiRequest<(AppOnetimeCharge | AppRecurringCharge)[]>('/billing/apps/charges');
  }
}
