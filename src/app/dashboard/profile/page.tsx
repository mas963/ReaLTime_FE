"use client"

import { AuthGuard } from "@/components/AuthGuard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: session, update } = useSession(); // oturum bilgilerini ve güncelleme fonksiyonunu al
  const router = useRouter();
  const [name, setName] = useState(session?.user.name);
  const [email, setEmail] = useState(session?.user.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [serverError, setServerError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session) {
      setName(session.user.name);
      setEmail(session.user.email);
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setServerError("");

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data[0].message || 'Sifre güncellenirken bir hata oluştu.');
      }

      // oturum bilgilerini güncelle
      await update({ name, email });
      router.refresh();
      toast.success("Profiliniz güncellendi.");
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setServerError("");

    try {
      const response = await fetch('/api/profile/change-password', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data[0].message || 'Sifre güncellenirken bir hata oluştu.');
      }

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      toast.success("Sifreniz başarıyla güncellendi.");
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthGuard>
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Profil Bilgileri</CardTitle>
          </CardHeader>
          <CardContent>
            {serverError && (
              <Alert variant="destructive">
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ad</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Adınız"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Güncelleniyor...' : 'Güncelle'}
              </Button>
            </form>

            <form onSubmit={handlePasswordChange} className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold">Şifre Güncelleme</h3>
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Mevcut Şifreniz"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Yeni Şifre</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Yeni Şifreniz"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Yeni Şifre Tekrar</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Yeni şifreni tekrar girin"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  );
}