export default function getDiagnosisStatus(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_HOME_DIAGNOSIS_TEST_STATUS);
}
